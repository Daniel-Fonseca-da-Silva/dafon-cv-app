"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiEye, FiDownload, FiStar } from "react-icons/fi"
import { useTranslations } from "next-intl"
import { TemplateCardProps } from "@/types/template.types"

export function TemplateCard({ template, onView, onDownload }: TemplateCardProps) {
  const t = useTranslations('templateManagement')

  return (
    <Card className="group hover:scale-105 transition-all duration-300 backdrop-blur-xl bg-white/10 border-white/20 shadow-xl hover:shadow-2xl">
      <CardHeader className="p-4">
        <div className="relative">
          {/* Thumbnail placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-white/60 text-sm">Template Preview</div>
          </div>
          
          {/* Premium badge */}
          {template.isPremium && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <FiStar className="w-3 h-3 mr-1" />
              Premium
            </div>
          )}
          
          {/* Coming Soon badge */}
          {template.isSoon && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {t('badges.comingSoon')}
            </div>
          )}
        </div>
        
        <CardTitle className="text-white text-lg font-semibold mb-2">
          {template.title}
        </CardTitle>
        
        <CardDescription className="text-white/70 text-sm mb-3">
          {template.description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-white/60 mb-3">
          <span>{template.downloads} downloads</span>
          <span>★ {template.rating}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex space-x-2">
          <Button
            onClick={() => !template.isSoon && onView(template.id)}
            variant="outline"
            size="sm"
            disabled={template.isSoon}
            className={`flex-1 ${
              template.isSoon 
                ? 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
            }`}
          >
            <FiEye className="w-4 h-4 mr-2" />
            {t('actions.view')}
          </Button>
          
          <Button
            onClick={() => !template.isSoon && onDownload(template.id)}
            size="sm"
            disabled={template.isSoon}
            className={`flex-1 ${
              template.isSoon 
                ? 'bg-white/5 text-white/40 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white'
            }`}
          >
            <FiDownload className="w-4 h-4 mr-2" />
            {t('actions.download')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
