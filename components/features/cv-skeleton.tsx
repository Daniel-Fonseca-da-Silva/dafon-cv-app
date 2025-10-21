"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CvSkeleton() {
  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-12 h-12 rounded-full bg-white/20" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-white/20" />
              <Skeleton className="h-4 w-48 bg-white/20" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-full bg-white/20" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-40 bg-white/20" />
          <Skeleton className="h-4 w-44 bg-white/20" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-8 w-full bg-white/20" />
          <Skeleton className="h-8 w-full bg-white/20" />
          <Skeleton className="h-8 w-full bg-white/20" />
          <Skeleton className="h-8 w-full bg-white/20" />
        </div>
      </CardContent>
    </Card>
  )
}
