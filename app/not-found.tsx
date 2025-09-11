'use client';

import { useState, useEffect } from 'react';

// Simple icon components to avoid external dependencies
const ArrowLeftIcon = () => (
  <svg style={{ width: 'clamp(0.875rem, 2vw, 1rem)', height: 'clamp(0.875rem, 2vw, 1rem)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// Text content in both languages
const content = {
  pt: {
    title: "Página Não Encontrada",
    subtitle: "Oops! Parece que você se perdeu no espaço digital",
    description: "A página que você está procurando não existe ou foi movida. Mas não se preocupe, vamos te ajudar a encontrar o que precisa!",
    goHome: "Voltar ao Início",
    goBack: "Voltar",
    errorCode: "404"
  },
  en: {
    title: "Page Not Found",
    subtitle: "Oops! Looks like you got lost in digital space",
    description: "The page you're looking for doesn't exist or has been moved. But don't worry, we'll help you find what you need!",
    goHome: "Go Home",
    goBack: "Go Back",
    errorCode: "404"
  }
};

export default function NotFound() {
  const [locale, setLocale] = useState('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect language from URL or browser
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      setLocale('en');
    } else {
      setLocale('pt');
    }
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const t = content[locale as keyof typeof content];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      margin: 0,
      boxSizing: 'border-box'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
        `
      }} />
      
      {/* Glassmorphism Container */}
      <div style={{
        position: 'relative',
        maxWidth: 'min(90vw, 48rem)',
        width: '100%',
        textAlign: 'center',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: 'clamp(2rem, 5vw, 4rem)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'float 6s ease-in-out infinite'
      }}>
          {/* Error Code */}
        <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(5rem, 12vw, 7rem)',
            height: 'clamp(5rem, 12vw, 7rem)',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: '800',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>{t.errorCode}</span>
          </div>
          </div>

          {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          fontWeight: '800',
          color: 'white',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          lineHeight: '1.1',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          letterSpacing: '-0.02em'
        }}>
          {t.title}
          </h1>

          {/* Subtitle */}
        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          fontWeight: '500',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }}>
          {t.subtitle}
          </h2>

          {/* Description */}
        <p style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          maxWidth: '32rem',
          margin: '0 auto clamp(2rem, 5vw, 3rem) auto',
          lineHeight: '1.6',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }}>
          {t.description}
        </p>

        {/* Action Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'clamp(2rem, 5vw, 3rem)'
        }}>
          <button 
            onClick={handleGoBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: '600',
              borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              minWidth: 'clamp(12rem, 30vw, 16rem)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <ArrowLeftIcon />
            <span style={{ marginLeft: 'clamp(0.375rem, 1vw, 0.5rem)' }}>{t.goBack}</span>
          </button>
          </div>

        {/* Language Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 2vw, 1rem)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
          padding: 'clamp(0.25rem, 1vw, 0.5rem)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <button
            onClick={() => setLocale('pt')}
            style={{
              padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
              borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              background: locale === 'pt' ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              color: locale === 'pt' ? 'white' : 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '600'
            }}
            onMouseOver={(e) => {
              if (locale !== 'pt') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseOut={(e) => {
              if (locale !== 'pt') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }
            }}
          >
            PT
          </button>
          <button
            onClick={() => setLocale('en')}
            style={{
              padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
              borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              background: locale === 'en' ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              color: locale === 'en' ? 'white' : 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '600'
            }}
            onMouseOver={(e) => {
              if (locale !== 'en') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseOut={(e) => {
              if (locale !== 'en') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }
            }}
          >
            EN
          </button>
        </div>
        </div>

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: 'clamp(3rem, 8vw, 6rem)',
        height: 'clamp(3rem, 8vw, 6rem)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: 'clamp(4rem, 10vw, 8rem)',
        height: 'clamp(4rem, 10vw, 8rem)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'pulse 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '15%',
        width: 'clamp(2rem, 6vw, 4rem)',
        height: 'clamp(2rem, 6vw, 4rem)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'pulse 5s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40%',
        left: '70%',
        width: 'clamp(3rem, 7vw, 5rem)',
        height: 'clamp(3rem, 7vw, 5rem)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03))',
        borderRadius: '50%',
        filter: 'blur(35px)',
        animation: 'pulse 7s ease-in-out infinite'
      }} />
    </div>
  );
}
