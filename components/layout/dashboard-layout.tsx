"use client"

import { useState, ReactNode, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { FiMenu, FiUser } from "react-icons/fi"
import { useTranslations } from "next-intl"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"
import AlertDialogCustom from "../ui/alert-dialog-custom"

interface UserData {
  name: string
  email: string
  image_url?: string
}

interface DashboardLayoutProps {
  children: ReactNode
  userData: UserData
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DashboardLayout({ 
  children, 
  userData, 
  activeSection, 
  onSectionChange 
}: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPremiumAlert, setShowPremiumAlert] = useState(false)
  const alertProcessedRef = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('dashboard.sections')
  const { checkSession } = useAuth()

  // detect premium activated parameter only in dashboard section
  useEffect(() => {
    const premiumActivated = searchParams.get('premium_activated')
    
    // only show alert if in dashboard section and not processed yet
    if (premiumActivated === 'true' && activeSection === 'dashboard' && !alertProcessedRef.current) {
      alertProcessedRef.current = true
      setShowPremiumAlert(true)
      
      // clear parameter from URL after showing alert
      const url = new URL(window.location.href)
      url.searchParams.delete('premium_activated')
      router.replace(url.pathname + url.search, { scroll: false })
    }
    
    // reset ref if no premium_activated parameter
    if (premiumActivated !== 'true') {
      alertProcessedRef.current = false
    }
  }, [searchParams, router, activeSection])

  // clear alert when changing section
  useEffect(() => {
    if (activeSection !== 'dashboard') {
      setShowPremiumAlert(false)
      alertProcessedRef.current = false
    }
  }, [activeSection])

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSectionChange = async (section: string) => {
    // check session before changing section
    await checkSession()
    onSectionChange(section)
    setIsMobileMenuOpen(false) // close mobile menu when selecting a section
  }

  const handleClosePremiumAlert = () => {
    setShowPremiumAlert(false)
    alertProcessedRef.current = false
  }

  const getSectionTitle = (section: string) => {
    try {
      return t(`${section}.title`)
    } catch {
      return t('dashboard.title')
    }
  }

  const getSectionDescription = (section: string) => {
    try {
      return t(`${section}.description`)
    } catch {
      return t('dashboard.description')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative flex h-screen z-10">
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto' : 'hidden lg:block'}
        `}>
          <Sidebar 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            userName={userData.name}
            userEmail={userData.email}
            userAvatar={userData.image_url}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
            isMobile={isMobileMenuOpen}
            onMobileClose={() => setIsMobileMenuOpen(false)}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="p-4 lg:p-6 border-b border-white/10 backdrop-blur-xl bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                {/* button to open mobile menu */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMobileMenuToggle}
                  className="text-white/80 hover:text-white hover:bg-white/10 lg:hidden"
                >
                  <FiMenu className="w-5 h-5" />
                </Button>

                {/* button to expand sidebar when collapsed (desktop) */}
                {isSidebarCollapsed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleSidebar}
                    className="text-white/80 hover:text-white hover:bg-white/10 hidden lg:flex"
                  >
                    <FiMenu className="w-5 h-5" />
                  </Button>
                )}
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg lg:text-2xl font-bold text-white truncate">
                    {getSectionTitle(activeSection)}
                  </h1>
                  <p className="text-white/70 text-sm lg:text-base mt-1 hidden sm:block">
                    {getSectionDescription(activeSection)}
                  </p>
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-white font-medium text-sm lg:text-base truncate max-w-32 lg:max-w-none">
                    {userData.name}
                  </p>
                  <p className="text-white/60 text-xs lg:text-sm truncate max-w-32 lg:max-w-none">
                    {userData.email}
                  </p>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center border-2 border-white/20">
                  {userData.image_url ? (
                    <Image 
                      src={userData.image_url} 
                      alt={userData.name}
                      width={40}
                      height={40}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        console.error('Error loading user avatar in header:', e);
                        e.currentTarget.style.display = 'none';
                      }}
                      unoptimized
                    />
                  ) : (
                    <FiUser className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Premium Activation Alert - only in dashboard section */}
          {showPremiumAlert && activeSection === 'dashboard' && (
            <div className="px-4 lg:px-6 pt-4">
              <AlertDialogCustom 
                handleClosePremiumAlert={handleClosePremiumAlert}
                alertTitle={t('premiumAlert.title')}
                alertDescription={t('premiumAlert.description')}
                color="green"
              />
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
