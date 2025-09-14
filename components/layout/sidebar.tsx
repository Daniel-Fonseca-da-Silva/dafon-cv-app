"use client"

import { FiUser, FiSettings, FiFileText, FiCreditCard, FiLogOut, FiMenu, FiX } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

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
  userName = "Usuário", 
  userEmail = "usuario@exemplo.com",
  userAvatar,
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
  onMobileClose
}: SidebarProps) {

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: FiFileText,
      description: "Visão geral"
    },
    {
      id: "generate-cv",
      label: "Gerar CV com IA",
      icon: FiFileText,
      description: "Criar currículo"
    },
    {
      id: "profile",
      label: "Meu Perfil",
      icon: FiUser,
      description: "Informações pessoais"
    },
    {
      id: "settings",
      label: "Configurações",
      icon: FiSettings,
      description: "Preferências"
    },
    {
      id: "plans",
      label: "Meus Planos",
      icon: FiCreditCard,
      description: "Assinatura atual"
    }
  ]

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
                    alt={userName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
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
                    {userName}
                  </h3>
                  <p className="text-white/70 text-xs truncate">
                    {userEmail}
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
                  onClick={() => onSectionChange(item.id)}
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
              className="w-full justify-start h-12 px-3 text-white/80 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            >
              <FiLogOut className={`w-5 h-5 ${(isCollapsed && !isMobile) ? 'mx-auto' : 'mr-3'}`} />
              {(!isCollapsed || isMobile) && <span className="font-medium text-sm">Sair</span>}
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
                    <p className="text-white font-semibold text-sm">Dafon CV</p>
                    <p className="text-white/60 text-xs">Powered by AI</p>
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
