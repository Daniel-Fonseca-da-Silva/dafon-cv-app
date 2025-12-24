"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SettingsSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-white/20" />
          <div className="space-y-2">
            <Skeleton className="h-6 lg:h-8 w-48 bg-white/20" />
            <Skeleton className="h-4 lg:h-5 w-64 hidden sm:block bg-white/20" />
          </div>
        </div>
        <Skeleton className="h-10 w-24 bg-white/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Notifications Card Skeleton */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5 bg-white/20" />
              <Skeleton className="h-6 w-32 bg-white/20" />
            </div>
            <Skeleton className="h-4 w-48 bg-white/20" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40 bg-white/20" />
                  <Skeleton className="h-4 w-56 bg-white/20" />
                </div>
                <Skeleton className="w-11 h-6 rounded-full bg-white/20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Card Skeleton */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5 bg-white/20" />
              <Skeleton className="h-6 w-28 bg-white/20" />
            </div>
            <Skeleton className="h-4 w-44 bg-white/20" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-white/20" />
              <Skeleton className="h-10 w-full bg-white/20" />
            </div>
            <Skeleton className="h-10 w-32 bg-white/20" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
