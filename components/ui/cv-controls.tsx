"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FiRefreshCw, FiArrowUp, FiArrowDown } from "react-icons/fi"

interface CvControlsProps {
  pageSize: number
  sortBy: string
  sortOrder: 'ASC' | 'DESC'
  onPageSizeChange: (size: number) => void
  onSortChange: (field: string) => void
  onSortOrderChange: (order: 'ASC' | 'DESC') => void
  onRefresh: () => void
  loading?: boolean
  className?: string
}


export function CvControls({
  pageSize,
  sortBy,
  sortOrder,
  onPageSizeChange,
  onSortChange,
  onSortOrderChange,
  onRefresh,
  loading = false,
  className = ""
}: CvControlsProps) {
  const t = useTranslations('cvControls')

  const sortOptions = [
    { value: 'full_name', label: t('sortOptions.name') },
    { value: 'email', label: t('sortOptions.email') },
    { value: 'created_at', label: t('sortOptions.createdAt') },
    { value: 'updated_at', label: t('sortOptions.updatedAt') }
  ]

  const pageSizeOptions = [
    { value: 4, label: t('pageSizeOptions.4') },
    { value: 10, label: t('pageSizeOptions.10') },
    { value: 20, label: t('pageSizeOptions.20') },
    { value: 50, label: t('pageSizeOptions.50') }
  ]

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${className}`}>
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-white/70 whitespace-nowrap">
          {t('labels.show')}
        </label>
        <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {pageSizeOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value.toString()}
                className="text-white hover:bg-gray-700"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-white/70 whitespace-nowrap">
          {t('labels.sortBy')}
        </label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px] bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {sortOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="text-white hover:bg-gray-700"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortOrderChange(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          {sortOrder === 'ASC' ? (
            <FiArrowUp className="w-4 h-4" />
          ) : (
            <FiArrowDown className="w-4 h-4" />
          )}
          <span className="ml-1 text-xs">
            {sortOrder === 'ASC' ? t('sortOrder.asc') : t('sortOrder.desc')}
          </span>
        </Button>
      </div>

      {/* Refresh Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={loading}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
      >
        <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        <span className="ml-1 text-xs">{t('labels.update')}</span>
      </Button>
    </div>
  )
}
