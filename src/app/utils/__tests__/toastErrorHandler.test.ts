import { handleRtkQueryError } from '../toastErrorHandler';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

// Mock sonner
jest.mock('sonner');

describe('toastErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not show toast if error is undefined', () => {
    handleRtkQueryError(undefined);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should handle 429 rate limit error', () => {
    const error: FetchBaseQueryError = {
      status: 429,
      data: 'Rate limit exceeded',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Rate limit exceeded', {
      description: 'Too many requests. Please wait a moment and try again.',
      duration: 5000,
    });
  });

  it('should handle 401 authentication error', () => {
    const error: FetchBaseQueryError = {
      status: 401,
      data: 'Unauthorized',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Authentication required', {
      description: 'Please check your API key configuration.',
      duration: 5000,
    });
  });

  it('should handle 403 forbidden error', () => {
    const error: FetchBaseQueryError = {
      status: 403,
      data: 'Forbidden',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Access forbidden', {
      description: 'You do not have permission to access this resource.',
      duration: 5000,
    });
  });

  it('should handle 404 not found error', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: 'Not found',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Not found', {
      description: 'The requested resource could not be found.',
      duration: 5000,
    });
  });

  it('should handle 500 server error', () => {
    const error: FetchBaseQueryError = {
      status: 500,
      data: 'Internal server error',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Server error', {
      description: 'Something went wrong on the server. Please try again later.',
      duration: 5000,
    });
  });

  it('should handle FETCH_ERROR', () => {
    const error: FetchBaseQueryError = {
      status: 'FETCH_ERROR',
      error: 'Network error',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Network error', {
      description: 'Unable to reach the server. Check your internet connection.',
      duration: 5000,
    });
  });

  it('should handle PARSING_ERROR', () => {
    const error: FetchBaseQueryError = {
      status: 'PARSING_ERROR',
      error: 'Failed to parse',
      originalStatus: 200,
      data: 'Invalid JSON',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Data error', {
      description: 'Failed to parse server response.',
      duration: 5000,
    });
  });

  it('should handle TIMEOUT_ERROR', () => {
    const error: FetchBaseQueryError = {
      status: 'TIMEOUT_ERROR',
      error: 'Request timeout',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Request timeout', {
      description: 'The request took too long. Please try again.',
      duration: 5000,
    });
  });

  it('should handle generic numeric status code', () => {
    const error: FetchBaseQueryError = {
      status: 418,
      data: "I'm a teapot",
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Error 418', {
      description: 'An unexpected error occurred. Please try again.',
      duration: 5000,
    });
  });

  it('should handle SerializedError with message', () => {
    const error: SerializedError = {
      message: 'Something went wrong',
      name: 'Error',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('Error', {
      description: 'Something went wrong',
      duration: 5000,
    });
  });

  it('should handle SerializedError without message', () => {
    const error: SerializedError = {
      name: 'Error',
    };

    handleRtkQueryError(error);

    expect(toast.error).toHaveBeenCalledWith('An error occurred', {
      description: 'Please try again later',
      duration: 5000,
    });
  });
});
