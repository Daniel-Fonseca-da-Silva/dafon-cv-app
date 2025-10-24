"use client"

import { FiUser, FiSettings, FiFileText, FiCreditCard, FiGrid, FiLogOut, FiMenu, FiX, FiFolder } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  userName?: string
  userEmail?: string
  userAvatar?: string
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobile?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ 
  activeSection, 
  onSectionChange, 
  userName, 
  userEmail,
  userAvatar,
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
  onMobileClose
}: SidebarProps) {
  const t = useTranslations('sidebar')
  const router = useRouter()
  const { checkSession } = useAuth()

  const handleSectionChange = async (section: string) => {
    // Verificar sessão antes de mudar de seção
    await checkSession()
    onSectionChange(section)
  }

  const handleLogout = async () => {
    try {
      // Chamar endpoint de logout
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Limpar dados locais se necessário
        localStorage.clear()
        sessionStorage.clear()
        
        // Redirecionar para a página de login
        router.push('/auth/login')
      } else {
        console.error('Error logging out')
        // Mesmo com erro, redirecionar para login
        router.push('/auth/login')
      }
    } catch (error) {
      console.error('Error logging out:', error)
      // Mesmo com erro, redirecionar para login
      router.push('/auth/login')
    }
  }

  const menuItems = [
    {
      id: "dashboard",
      label: t('menuItems.dashboard.label'),
      icon: FiFileText,
      description: t('menuItems.dashboard.description')
    },
    {
      id: "generate-cv",
      label: t('menuItems.generate-cv.label'),
      icon: FiFileText,
      description: t('menuItems.generate-cv.description')
    },
    {
      id: "my-cvs",
      label: t('menuItems.my-cvs.label'),
      icon: FiFolder,
      description: t('menuItems.my-cvs.description')
    },
    {
      id: "templates",
      label: t('menuItems.templates.label'),
      icon: FiGrid,
      description: t('menuItems.templates.description')
    },
    {
      id: "profile",
      label: t('menuItems.profile.label'),
      icon: FiUser,
      description: t('menuItems.profile.description')
    },
    {
      id: "settings",
      label: t('menuItems.settings.label'),
      icon: FiSettings,
      description: t('menuItems.settings.description')
    },
    {
      id: "plans",
      label: t('menuItems.plans.label'),
      icon: FiCreditCard,
      description: t('menuItems.plans.description')
    }
  ]

  const displayUserName = userName || t('user.defaultName')
  const displayUserEmail = userEmail || t('user.defaultEmail')

  return (
    <div className={`h-full transition-all duration-300 ${
      isMobile ? 'w-64' : (isCollapsed ? 'w-16' : 'w-64')
    }`}>
      <Card className="h-full backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-none border-0 border-r">
        <div className="p-4 h-full flex flex-col">
          {/* Mobile Close Button */}
          {isMobile && (
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMobileClose}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <FiX className="w-5 h-5" />
              </Button>
            </div>
          )}
          {/* User Profile Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                {userAvatar ? (
                  <Image 
                    src={userAvatar} 
                    alt={displayUserName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    onError={(e) => {
                      console.error('Error loading user avatar:', e);
                      // Fallback para avatar padrão em caso de erro
                      e.currentTarget.style.display = 'none';
                    }}
                    unoptimized
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center border-2 border-white/20">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20"></div>
              </div>
              {(!isCollapsed || isMobile) && (
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {displayUserName}
                  </h3>
                  <p className="text-white/70 text-xs truncate">
                    {displayUserEmail}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full justify-start h-12 px-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-orange-400/20 to-pink-400/20 border border-white/20 text-white shadow-lg' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${(isCollapsed && !isMobile) ? 'mx-auto' : 'mr-3'}`} />
                  {(!isCollapsed || isMobile) && (
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-4 border-t border-white/20">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start h-12 px-3 text-white/80 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            >
              <FiLogOut className={`w-5 h-5 ${(isCollapsed && !isMobile) ? 'mx-auto' : 'mr-3'}`} />
              {(!isCollapsed || isMobile) && <span className="font-medium text-sm">{t('logout')}</span>}
            </Button>
          </div>

          {/* Logo Dafon CV */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-center">
              {(isCollapsed && !isMobile) ? (
                <div className="w-8 h-8 relative">
                  <Image 
                    src="/logos/logo-32x32.png" 
                    alt="Dafon CV" 
                    width={32} 
                    height={32}
                    className="rounded"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 relative">
                    <Image 
                      src="/logos/logo-32x32.png" 
                      alt="Dafon CV" 
                      width={32} 
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t('brand.name')}</p>
                    <p className="text-white/60 text-xs">{t('brand.tagline')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Collapse Toggle - Only show on desktop */}
          {!isMobile && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="w-full text-white/60 hover:text-white hover:bg-white/10"
              >
                {isCollapsed ? <FiMenu className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
