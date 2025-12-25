// html2canvas-pro e jsPDF serão importados dinamicamente no lado do cliente

export interface PdfTranslations {
  title: string
  contact: {
    driverLicense: string
  }
  sections: {
    presentation: string
    skills: string
    technicalSkills: string
    courses: string
    professionalExperience: string
    education: string
    languages: string
    linguisticProficiency: string
  }
  common: {
    current: string
    inProgress: string
  }
}

export interface CurriculumData {
  id: string
  full_name: string
  email: string
  phone: string
  driver_license: string
  intro: string
  skills: string
  languages: string
  courses: string
  social_links: string
  works: Array<{
    id: string
    position: string
    company: string
    description: string
    start_date: string
    end_date: string
    created_at: string
    updated_at: string
  }>
  educations: Array<{
    id: string
    institution: string
    degree: string
    start_date: string
    end_date: string
    description: string
    created_at: string
    updated_at: string
  }>
  created_at: string
  updated_at: string
}

export const fetchCurriculumData = async (cvId: string): Promise<CurriculumData> => {
  try {
    const response = await fetch(`/api/curriculums/${cvId}`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Error searching curriculum: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error searching curriculum:', error)
    throw error
  }
}

export const formatDate = (dateString: string, locale: string = 'pt-EU'): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    month: '2-digit',
    year: 'numeric'
  })
}

export const createCurriculumHTML = (data: CurriculumData, t: PdfTranslations, locale: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="${locale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.title} - ${data.full_name}</title>
      <link rel="stylesheet" href="/modern-professional-style.css" type="text/css">
    </head>
    <body>
      <div class="pdf-container">
        <div class="pdf-header">
          <h1>${data.full_name}</h1>
          <div class="pdf-contact-info">
            <div>📧 ${data.email}</div>
            <div>📱 ${data.phone}</div>
            ${data.driver_license ? `<div>🚗 ${t.contact.driverLicense}: ${data.driver_license}</div>` : ''}
          </div>
        </div>
        
        <div class="pdf-section">
          <h2 class="pdf-section-title">${t.sections.presentation}</h2>
          <div class="pdf-intro">
            ${data.intro}
          </div>
        </div>
        
        <div class="pdf-section">
          <h2 class="pdf-section-title">${t.sections.skills}</h2>
          <div class="pdf-skills-grid">
            <div class="pdf-skill-item">
              <h4>${t.sections.technicalSkills}</h4>
              <p>${data.skills}</p>
            </div>
            <div class="pdf-skill-item">
              <h4>${t.sections.courses}</h4>
              <p>${data.courses}</p>
            </div>
          </div>
        </div>
        
        ${data.works.length > 0 ? `
        <div class="pdf-section">
          <h2 class="pdf-section-title">${t.sections.professionalExperience}</h2>
          ${data.works.map(work => `
            <div class="pdf-experience-item">
              <h3>${work.position}</h3>
              <div class="pdf-company">${work.company}</div>
              <div class="pdf-period">${formatDate(work.start_date, locale)} - ${work.end_date ? formatDate(work.end_date, locale) : t.common.current}</div>
              <div class="pdf-description">${work.description}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${data.educations.length > 0 ? `
        <div class="pdf-section">
          <h2 class="pdf-section-title">${t.sections.education}</h2>
          ${data.educations.map(education => `
            <div class="pdf-education-item">
              <h3>${education.degree}</h3>
              <div class="pdf-institution">${education.institution}</div>
              <div class="pdf-period">${formatDate(education.start_date, locale)} - ${education.end_date ? formatDate(education.end_date, locale) : t.common.inProgress}</div>
              ${education.description ? `<div class="pdf-description">${education.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        <div class="pdf-section">
          <h2 class="pdf-section-title">${t.sections.languages}</h2>
          <div class="pdf-languages">
            <h4>${t.sections.linguisticProficiency}</h4>
            <p>${data.languages}</p>
          </div>
        </div>
        
        ${data.social_links ? `
        <div class="pdf-social-links">
          <a href="${data.social_links}" target="_blank">${data.social_links}</a>
        </div>
        ` : ''}
      </div>
    </body>
    </html>
  `
}

export const generatePDF = async (
  cvId: string, 
  translations: PdfTranslations, 
  locale: string, 
  download: boolean = true
): Promise<void> => {
  try {
    // Verificar se estamos no lado do cliente
    if (typeof window === 'undefined') {
      throw new Error('generatePDF only can be executed on the client side')
    }
    
    // Importar html2canvas-pro e jsPDF dinamicamente
    const html2canvas = (await import('html2canvas-pro')).default
    const { jsPDF } = await import('jspdf')
    
    // Buscar dados do currículo
    const curriculumData = await fetchCurriculumData(cvId)
    
    // Criar HTML do currículo
    const htmlContent = createCurriculumHTML(curriculumData, translations, locale)
    
    // Criar iframe oculto completamente isolado
    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.left = '-9999px'
    iframe.style.top = '-9999px'
    iframe.style.width = '800px'
    iframe.style.height = 'auto'
    iframe.style.border = 'none'
    iframe.style.background = 'white'
    document.body.appendChild(iframe)
    
    // Aguardar o iframe carregar
    await new Promise(resolve => {
      iframe.onload = resolve
      iframe.src = 'about:blank'
    })
    
    // Escrever o HTML no iframe (completamente isolado)
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (iframeDoc) {
      iframeDoc.documentElement.innerHTML = htmlContent
    }
    
    // Aguardar um pouco para garantir que todos os estilos foram aplicados
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Usar html2canvas-pro para converter para imagem
    const iframeBody = iframe.contentDocument?.body
    if (!iframeBody) {
      throw new Error('Cant access the iframe content')
    }
    
    const canvas = await html2canvas(iframeBody, {
      scale: 1.5, // Reduzir escala para otimizar tamanho
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 800,
      height: undefined, // Deixar altura automática
      ignoreElements: (element: Element) => {
        return element.tagName === 'SCRIPT'
      }
    })
    
    // Criar PDF com jsPDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    // Adicionar a imagem ao PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.98)
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    // Verificar se a imagem cabe em uma página
    if (imgHeight <= pageHeight) {
      // Se cabe em uma página, adicionar apenas uma vez
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      // Se não cabe, dividir em páginas
      let heightLeft = imgHeight
      let position = 0
      
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
    }
    
    // Salvar ou visualizar o PDF
    if (download) {
      const prefix = locale === 'en' ? 'resume_' : 'curriculo_'
      pdf.save(`${prefix}${curriculumData.full_name.replace(/\s+/g, '_')}.pdf`)
    } else {
      // Abrir PDF em nova aba para visualização
      const pdfBlob = pdf.output('blob')
      const pdfUrl = URL.createObjectURL(pdfBlob)
      window.open(pdfUrl, '_blank')
      
      // Limpar URL após um tempo para liberar memória
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl)
      }, 60000) // 1 minuto
    }
    
    // Remover iframe temporário
    document.body.removeChild(iframe)
    
  } catch (error) {
    throw error
  }
}

export const previewPDF = async (
  cvId: string, 
  translations: PdfTranslations, 
  locale: string
): Promise<void> => {
  return generatePDF(cvId, translations, locale, false)
}
