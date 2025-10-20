"use client"

import { Button } from "@/components/ui/button"
import { FiGrid, FiList } from "react-icons/fi"
import { useTranslations } from "next-intl"
import { TemplateFiltersProps } from "@/types/template.types"

export function TemplateFilters({ 
  filter, 
  viewMode, 
  onFilterChange, 
  onViewModeChange 
}: TemplateFiltersProps) {
  const t = useTranslations('templateManagement')

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex gap-2">
        <Button
          onClick={() => onFilterChange('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          className={filter === 'all' 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }
        >
          {t('filters.all')}
        </Button>
        <Button
          onClick={() => onFilterChange('free')}
          variant={filter === 'free' ? 'default' : 'outline'}
          size="sm"
          className={filter === 'free' 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }
        >
          {t('filters.free')}
        </Button>
        <Button
          onClick={() => onFilterChange('premium')}
          variant={filter === 'premium' ? 'default' : 'outline'}
          size="sm"
          className={filter === 'premium' 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }
        >
          {t('filters.premium')}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => onViewModeChange('grid')}
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          className={viewMode === 'grid' 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }
        >
          <FiGrid className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => onViewModeChange('list')}
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          className={viewMode === 'list' 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }
        >
          <FiList className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
