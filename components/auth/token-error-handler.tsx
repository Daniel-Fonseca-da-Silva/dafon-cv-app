'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface TokenErrorHandlerProps {
  errorType?: 'expired' | 'invalid' | 'email_mismatch' | 'server_error';
  email?: string;
  onError?: (error: string) => void;
}

export function TokenErrorHandler({ 
  errorType = 'expired', 
  email = '', 
  onError 
}: TokenErrorHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    const handleTokenError = (error: string) => {
      if (onError) {
        onError(error);
      } else {
        // Redirect to token error page
        const params = new URLSearchParams();
        params.set('type', errorType);
        if (email) {
          params.set('email', email);
        }
        router.push(`/token-error?${params.toString()}`);
      }
    };

    // Listen for token errors from API responses
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        // Check if response is a token error
        if (!response.ok && response.status >= 400) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            
            if (data.error) {
              const errorMessage = data.error.toLowerCase();
              
              if (errorMessage.includes('expired') || errorMessage.includes('token expired')) {
                handleTokenError('expired');
                return response;
              } else if (errorMessage.includes('invalid') || errorMessage.includes('invalid token')) {
                handleTokenError('invalid');
                return response;
              } else if (errorMessage.includes('email') && errorMessage.includes('correspond')) {
                handleTokenError('email_mismatch');
                return response;
              } else if (errorMessage.includes('internal server error')) {
                handleTokenError('server_error');
                return response;
              }
            }
          }
        }
        
        return response;
      } catch (error) {
        console.error('Fetch error:', error);
        return originalFetch(...args);
      }
    };

    // Cleanup function to restore original fetch
    return () => {
      window.fetch = originalFetch;
    };
  }, [errorType, email, onError, router]);

  return null; // This component doesn't render anything
}

// Hook for handling token errors in components
export function useTokenErrorHandler() {
  const router = useRouter();

  const handleTokenError = (
    errorType: 'expired' | 'invalid' | 'email_mismatch' | 'server_error',
    email?: string
  ) => {
    const params = new URLSearchParams();
    params.set('type', errorType);
    if (email) {
      params.set('email', email);
    }
    router.push(`/token-error?${params.toString()}`);
  };

  const extractErrorMessage = (err: unknown): string | null => {
    if (typeof err === 'string') return err;
    if (err && typeof err === 'object' && 'message' in err) {
      const possibleMessage = (err as { message?: unknown }).message;
      return typeof possibleMessage === 'string' ? possibleMessage : null;
    }
    return null;
  };

  const handleApiError = (error: unknown, email?: string) => {
    const message = extractErrorMessage(error);
    if (message) {
      const errorMessage = message.toLowerCase();
      
      if (errorMessage.includes('expired') || errorMessage.includes('token expired')) {
        handleTokenError('expired', email);
      } else if (errorMessage.includes('invalid') || errorMessage.includes('invalid token')) {
        handleTokenError('invalid', email);
      } else if (errorMessage.includes('email') && errorMessage.includes('correspond')) {
        handleTokenError('email_mismatch', email);
      } else if (errorMessage.includes('internal server error')) {
        handleTokenError('server_error', email);
      } else {
        // Default to server error for unknown errors
        handleTokenError('server_error', email);
      }
      return;
    }
    handleTokenError('server_error', email);
  };

  return {
    handleTokenError,
    handleApiError
  };
}
