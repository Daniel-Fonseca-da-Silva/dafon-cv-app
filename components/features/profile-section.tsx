"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { FiUser, FiMail, FiPhone, FiSave, FiCamera, FiArrowLeft } from "react-icons/fi"
import { useTranslations } from "next-intl"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"

interface ProfileSectionProps {
  onSectionChange?: (section: string) => void
}

export function ProfileSection({ onSectionChange }: ProfileSectionProps) {
  const t = useTranslations('profileSection')
  const { userData, isLoading, error, updateUserData } = useUserData()
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [employmentValue, setEmploymentValue] = useState<string>("unemployed")
  const [genderValue, setGenderValue] = useState<string>("male")
  const [migrationValue, setMigrationValue] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  
  // Estados para controlar os valores dos inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    age: '',
    salary: ''
  })

  const handleBackToDashboard = () => {
    if (onSectionChange) {
      onSectionChange('dashboard')
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validação do tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Please select only image files (JPEG, PNG, GIF, WebP)')
      return
    }

    // Validação do tamanho (máximo 5MB)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      alert('The file must be less than 2MB')
      return
    }

    // Criar URL para preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfilePhoto(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setSaveSuccess(false)

      // Preparar dados para envio
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        age: formData.age ? parseInt(formData.age) : null,
        salary: formData.salary ? parseFloat(formData.salary) : null,
        employment: employmentValue === "employed",
        gender: genderValue,
        migration: migrationValue,
        image_url: profilePhoto || undefined
      }

      await updateUserData(updateData)
      setSaveSuccess(true)
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSaveSuccess(false), 3000)
      
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Error saving data'
      console.error('Error saving profile:', errorMessage)
    } finally {
      setSaving(false)
    }
  }
  
  // Sincroniza dados do hook com o formulário
  useEffect(() => {
    if (userData) {
      // Atualizar valores dos radio groups
      setEmploymentValue(userData.employment === true ? "employed" : "unemployed")
      setGenderValue(userData.gender || "male")
      setMigrationValue(userData.migration === true)
      if (userData.image_url) setProfilePhoto(userData.image_url)
      
      // Atualizar dados do formulário
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        age: userData.age?.toString() || '',
        salary: userData.salary?.toString() || ''
      })
    }
  }, [userData])
  
  
  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <Spinner className="size-6 text-white" />
          <span className="text-white text-lg">{t('loading')}</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Cabecalho */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <FiUser className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-white">{t('header.title')}</h1>
            <p className="text-white/70 text-sm lg:text-base hidden sm:block">{t('header.subtitle')}</p>
          </div>
        </div>
        
        {/* Back Button */}
        {onSectionChange && (
          <Button
            onClick={handleBackToDashboard}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('header.backButton')}</span>
            <span className="sm:hidden">Voltar</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Foto do Perfil */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center">{t('photo.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24 lg:w-32 lg:h-32">
              <div 
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center border-4 border-white/20 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handlePhotoClick}
              >
                {profilePhoto ? (
                  <Image 
                    src={profilePhoto} 
                    alt="Profile" 
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <FiUser className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                )}
              </div>
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30"
                onClick={handlePhotoClick}
              >
                <FiCamera className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={handlePhotoClick}
            >
              {t('photo.changePhoto')}
            </Button>
            
            {/* Input file oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Informacoes Pessoais */}
        <Card className="lg:col-span-2 backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">
              {t('personalInfo.title')}
            </CardTitle>
            <CardDescription className="text-white/70">
              {t('personalInfo.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">{t('personalInfo.fullName')}</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">{t('personalInfo.email')}</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">{t('personalInfo.phone')}</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">{t('personalInfo.country')}</label>
                <Input 
                  placeholder=""
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">{t('personalInfo.state')}</label>
                <Input 
                  placeholder=""
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">{t('personalInfo.city')}</label>
                <Input 
                  placeholder=""
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">{t('personalInfo.age')}</label>
                <Input 
                  type="number"
                  placeholder=""
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informacoes Profissionais */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">
            {t('professionalInfo.title')}
          </CardTitle>
          <CardDescription className="text-white/70">
            {t('professionalInfo.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status de Emprego */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/90">{t('professionalInfo.employmentStatus')}</label>
              <RadioGroup 
                value={employmentValue}
                onValueChange={setEmploymentValue}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="employed" 
                    id="employed"
                    className="border-white/30 data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-400"
                  />
                  <label htmlFor="employed" className="text-white/90 cursor-pointer">
                    {t('professionalInfo.employed')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="unemployed" 
                    id="unemployed"
                    className="border-white/30 data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-400"
                  />
                  <label htmlFor="unemployed" className="text-white/90 cursor-pointer">
                    {t('professionalInfo.unemployed')}
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Salário Atual */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">{t('professionalInfo.currentSalary')}</label>
              <Input 
                placeholder={t('professionalInfo.salaryPlaceholder')}
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>

            {/* Migrando de Carreira */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/90">{t('professionalInfo.careerMigration')}</label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={migrationValue}
                  onChange={(e) => setMigrationValue(e.target.checked)}
                  className="w-4 h-4 text-purple-400 bg-white/20 border-white/30 rounded focus:ring-purple-400 focus:ring-2"
                />
                <span className="text-white/90">{t('professionalInfo.careerMigrationText')}</span>
              </label>
            </div>

            {/* Sexo */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/90">{t('professionalInfo.gender')}</label>
              <RadioGroup 
                value={genderValue}
                onValueChange={setGenderValue}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="male" 
                    id="male"
                    className="border-white/30 data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-400"
                  />
                  <label htmlFor="male" className="text-white/90 cursor-pointer">
                    {t('professionalInfo.male')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="female" 
                    id="female"
                    className="border-white/30 data-[state=checked]:bg-purple-400 data-[state=checked]:border-purple-400"
                  />
                  <label htmlFor="female" className="text-white/90 cursor-pointer">
                    {t('professionalInfo.female')}
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="space-y-3">
            {saveSuccess && (
              <div className="text-green-400 text-sm font-medium">
                ✓ Data saved successfully!
              </div>
            )}
            {error && (
              <div className="text-red-400 text-sm font-medium">
                {error}
              </div>
            )}
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                    Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  {t('professionalInfo.saveChanges')}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
