'use client'

import { Button } from "@/components/ui/button"
import { FiZap } from "react-icons/fi"
import { loadStripe } from "@stripe/stripe-js"
import { useCallback, useMemo } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js"

type PaymentButtonProps = {
  children: React.ReactNode
}

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

if (!stripePublishableKey) {
  console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in the environment variables')
}

export default function PaymentButton({ children }: PaymentButtonProps) {

  // const { user, loading } = useAuth()
  // const userEmail = user?.email

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const data = await response.json()
      return data.client_secret
    } catch (error) {
      console.error('Error fetching client secret:', error)
      throw error
    }
  }, [])

  const options = useMemo(() => ({
    fetchClientSecret
  }), [fetchClientSecret])

  if (!stripePromise) {
    return (
      <Button 
        disabled 
        className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-5 text-white"
      >
        <FiZap className="w-4 h-4 mr-2" />
        {children}
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild> 
        <Button className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-5 text-white">
          <FiZap className="w-4 h-4 mr-2" />
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Pagamento com Stripe</DialogTitle>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </DialogContent>
    </Dialog>
  )
}
