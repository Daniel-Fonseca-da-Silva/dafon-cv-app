"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TemplateSkeleton() {
  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20">
      <CardHeader className="p-4">
        <Skeleton className="w-full h-48 bg-white/20 rounded-lg mb-4" />
        <Skeleton className="h-6 bg-white/20 rounded mb-2" />
        <Skeleton className="h-4 bg-white/20 rounded mb-3" />
        <div className="flex justify-between mb-3">
          <Skeleton className="h-3 w-16 bg-white/20 rounded" />
          <Skeleton className="h-3 w-12 bg-white/20 rounded" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex space-x-2">
          <Skeleton className="flex-1 h-8 bg-white/20 rounded" />
          <Skeleton className="flex-1 h-8 bg-white/20 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}
