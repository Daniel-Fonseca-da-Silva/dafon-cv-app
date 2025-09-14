"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiCamera } from "react-icons/fi"

export function ProfileSection() {
  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4 lg:mb-6">
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <FiUser className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg lg:text-2xl font-bold text-white">Meu Perfil</h1>
          <p className="text-white/70 text-sm lg:text-base hidden sm:block">Gerencie suas informações pessoais</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Photo */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center">Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24 lg:w-32 lg:h-32">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center border-4 border-white/20">
                <FiUser className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              </div>
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
              >
                <FiCamera className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </Button>
            </div>
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              Alterar Foto
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2 backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Informações Pessoais</span>
              <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                <FiEdit3 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </CardTitle>
            <CardDescription className="text-white/70">
              Atualize suas informações básicas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Nome Completo</label>
                <Input 
                  defaultValue="Dafon CV"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input 
                    defaultValue="dafoncv@email.com"
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Telefone</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input 
                    defaultValue="(351) 99999-99999"
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Localização</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input 
                    defaultValue="Braga, PT"
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white">
              <FiSave className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Professional Information */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Informações Profissionais</span>
            <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              <FiEdit3 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </CardTitle>
          <CardDescription className="text-white/70">
            Detalhes sobre sua carreira e experiência
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Cargo Atual</label>
              <Input 
                defaultValue="Desenvolvedor"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Empresa</label>
              <Input 
                defaultValue="Dafon CV"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Anos de Experiência</label>
              <Input 
                defaultValue="5 anos"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Área de Atuação</label>
              <Input 
                defaultValue="Desenvolvimento"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Resumo Profissional</label>
            <textarea 
              defaultValue="Desenvolvedor frontend com 5 anos de experiência em React, TypeScript e Node.js. Apaixonado por criar interfaces de usuário intuitivas e responsivas."
              className="w-full h-24 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder:text-white/60 resize-none"
              placeholder="Descreva brevemente sua experiência profissional..."
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white">
            <FiSave className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
