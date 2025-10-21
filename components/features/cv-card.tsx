"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiEye, FiEdit, FiTrash2, FiDownload, FiUser, FiMail, FiCalendar } from "react-icons/fi"
import { useTranslations } from "next-intl"
import { CvCardProps } from "@/types/cv.types"

export function CvCard({ cv, onView, onEdit, onDelete, onDownload }: CvCardProps) {
  const t = useTranslations('cvManagement')


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="group hover:scale-105 transition-all duration-300 backdrop-blur-xl bg-white/10 border-white/20 shadow-xl hover:shadow-2xl">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full flex items-center justify-center">
            <FiUser className="w-6 h-6 text-white/80" />
          </div>
          <div>
            <CardTitle className="text-white text-lg font-semibold">
              {cv.fullName}
            </CardTitle>
            <div className="flex items-center text-white/60 text-sm mt-1">
              <FiMail className="w-4 h-4 mr-1" />
              {cv.email}
            </div>
          </div>
        </div>
        
        <CardDescription className="text-white/70 text-sm">
          <span className="flex items-center">
            <FiCalendar className="w-4 h-4 mr-2" />
            {t('createdAt')}: {formatDate(cv.createdAt)}
          </span>
          {cv.updatedAt && (
            <span className="flex items-center mt-1">
              <FiCalendar className="w-4 h-4 mr-2" />
              {t('updatedAt')}: {formatDate(cv.updatedAt)}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onView(cv.id)}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
          >
            <FiEye className="w-4 h-4 mr-2" />
            {t('actions.view')}
          </Button>
          
          <Button
            onClick={() => onEdit(cv.id)}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
          >
            <FiEdit className="w-4 h-4 mr-2" />
            {t('actions.edit')}
          </Button>
          
          <Button
            onClick={() => onDownload(cv.id)}
            size="sm"
            className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            {t('actions.download')}
          </Button>
          
          <Button
            onClick={() => onDelete(cv.id)}
            variant="outline"
            size="sm"
            className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:border-red-500/50"
          >
            <FiTrash2 className="w-4 h-4 mr-2" />
            {t('actions.delete')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
