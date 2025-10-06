'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Icon components
const LockIcon = () => (
  <svg style={{ width: 'clamp(1.5rem, 4vw, 2rem)', height: 'clamp(1.5rem, 4vw, 2rem)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const HomeIcon = () => (
  <svg style={{ width: 'clamp(1rem, 2.5vw, 1.25rem)', height: 'clamp(1rem, 2.5vw, 1.25rem)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const LoginIcon = () => (
  <svg style={{ width: 'clamp(1rem, 2.5vw, 1.25rem)', height: 'clamp(1rem, 2.5vw, 1.25rem)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);

const ClockIcon = () => (
  <svg style={{ width: 'clamp(1.5rem, 4vw, 2rem)', height: 'clamp(1.5rem, 4vw, 2rem)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function TokenErrorPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const errorType = searchParams.get('type') || 'expired';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const getErrorContent = () => {
    switch (errorType) {
      case 'expired':
        return {
          icon: <ClockIcon />,
          title: "Token Expired",
          subtitle: "Your authentication link has expired",
          description: "The magic link you clicked has expired for security reasons. Please request a new one to continue.",
          primaryAction: "Get New Link",
          secondaryAction: "Go Home"
        };
      case 'invalid':
        return {
          icon: <LockIcon />,
          title: "Invalid Token",
          subtitle: "This authentication link is not valid",
          description: "The link you clicked is either corrupted or has already been used. Please request a new authentication link.",
          primaryAction: "Get New Link",
          secondaryAction: "Go Home"
        };
      case 'email_mismatch':
        return {
          icon: <LockIcon />,
          title: "Email Mismatch",
          subtitle: "The email doesn't match the token",
          description: "There's a mismatch between the email and the authentication token. Please use the correct link sent to your email.",
          primaryAction: "Get New Link",
          secondaryAction: "Go Home"
        };
      case 'server_error':
        return {
          icon: <LockIcon />,
          title: "Server Error",
          subtitle: "Something went wrong on our end",
          description: "We encountered an internal server error while processing your request. Please try again in a few moments.",
          primaryAction: "Try Again",
          secondaryAction: "Go Home"
        };
      default:
        return {
          icon: <LockIcon />,
          title: "Authentication Error",
          subtitle: "Something went wrong with your authentication",
          description: "We encountered an issue while processing your authentication request. Please try again.",
          primaryAction: "Try Again",
          secondaryAction: "Go Home"
        };
    }
  };

  const content = getErrorContent();

  const handleGetNewLink = () => {
    if (email) {
      router.push(`/auth/login?email=${encodeURIComponent(email)}&expired=true`);
    } else {
      router.push('/auth/login?expired=true');
    }
  };

  const handleGoHome = () => {
    router.push('/');
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
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
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
        {/* Error Icon */}
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
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            animation: 'shake 2s ease-in-out infinite'
          }}>
            <div style={{ color: 'white' }}>
              {content.icon}
            </div>
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
          {content.title}
        </h1>

        {/* Subtitle */}
        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          fontWeight: '500',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }}>
          {content.subtitle}
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
          {content.description}
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: 'clamp(2rem, 5vw, 3rem)'
        }}>
          {/* Primary Action Button */}
          <button 
            onClick={handleGetNewLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
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
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <LoginIcon />
            <span style={{ marginLeft: 'clamp(0.375rem, 1vw, 0.5rem)' }}>{content.primaryAction}</span>
          </button>

          {/* Secondary Action Button */}
          <button 
            onClick={handleGoHome}
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
            <HomeIcon />
            <span style={{ marginLeft: 'clamp(0.375rem, 1vw, 0.5rem)' }}>{content.secondaryAction}</span>
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
