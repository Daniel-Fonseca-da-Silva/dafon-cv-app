"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PlansSkeletonProps {
  showBackButton?: boolean
}

export function PlansSkeleton({ showBackButton }: PlansSkeletonProps) {
  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-white/20" />
          <div>
            <Skeleton className="h-6 w-32 bg-white/20 mb-2" />
            <Skeleton className="h-4 w-48 bg-white/20 hidden sm:block" />
          </div>
        </div>
        {showBackButton && (
          <Skeleton className="h-10 w-24 bg-white/20" />
        )}
      </div>

      {/* Plano Atual Skeleton */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Skeleton className="w-5 h-5 bg-white/20" />
            <Skeleton className="h-6 w-40 bg-white/20" />
          </div>
          <Skeleton className="h-4 w-64 bg-white/20" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32 bg-white/20" />
              <Skeleton className="h-4 w-48 bg-white/20" />
            </div>
            <div className="text-right space-y-2">
              <Skeleton className="h-9 w-24 bg-white/20 ml-auto" />
              <Skeleton className="h-4 w-16 bg-white/20 ml-auto" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded-full bg-white/20" />
                <Skeleton className="h-4 w-full bg-white/20" />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-10 w-48 bg-white/20" />
            <Skeleton className="h-10 w-40 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Planos Disponíveis Skeleton */}
      <div>
        <Skeleton className="h-7 w-48 bg-white/20 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="backdrop-blur-xl bg-white/10 border-white/20">
              <CardHeader className="text-center items-center flex flex-col">
                <Skeleton className="h-7 w-32 bg-white/20 mb-4" />
                <Skeleton className="h-9 w-24 bg-white/20 mb-2" />
                <Skeleton className="h-4 w-16 bg-white/20" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <Skeleton className="w-4 h-4 rounded-full bg-white/20" />
                      <Skeleton className="h-4 w-full bg-white/20" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-10 w-full bg-white/20 mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Estatísticas de Uso Skeleton */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-white/20 mb-2" />
          <Skeleton className="h-4 w-64 bg-white/20" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <Skeleton className="h-8 w-16 bg-white/20 mb-2" />
                <Skeleton className="h-4 w-24 bg-white/20 mb-2" />
                <Skeleton className="h-2 w-full bg-white/20 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
