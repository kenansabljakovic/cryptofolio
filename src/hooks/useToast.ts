import { toast as sonnerToast } from 'sonner';

/**
 * Custom toast hook for Cryptofolio
 * Provides type-safe, consistent toast notifications across the app
 */
export const useToast = () => {
  return {
    success: (message: string, description?: string) => {
      sonnerToast.success(message, {
        description,
        duration: 4000,
      });
    },

    error: (message: string, description?: string) => {
      sonnerToast.error(message, {
        description,
        duration: 5000, // Longer for errors
      });
    },

    info: (message: string, description?: string) => {
      sonnerToast.info(message, {
        description,
        duration: 3000,
      });
    },

    warning: (message: string, description?: string) => {
      sonnerToast.warning(message, {
        description,
        duration: 4000,
      });
    },

    apiError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      sonnerToast.error('API Error', {
        description: message,
        duration: 5000,
      });
    },

    loading: (message: string) => {
      return sonnerToast.loading(message);
    },

    dismiss: (toastId?: string | number) => {
      sonnerToast.dismiss(toastId);
    },
  };
};
