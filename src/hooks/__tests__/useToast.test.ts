import { renderHook } from '@testing-library/react';
import { useToast } from '../useToast';
import { toast } from 'sonner';

// Mock sonner
jest.mock('sonner');

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call sonner success toast with correct parameters', () => {
    const { result } = renderHook(() => useToast());

    result.current.success('Test message', 'Test description');

    expect(toast.success).toHaveBeenCalledWith('Test message', {
      description: 'Test description',
      duration: 4000,
    });
  });

  it('should call sonner success toast without description', () => {
    const { result } = renderHook(() => useToast());

    result.current.success('Test message');

    expect(toast.success).toHaveBeenCalledWith('Test message', {
      description: undefined,
      duration: 4000,
    });
  });

  it('should call sonner error toast with correct parameters', () => {
    const { result } = renderHook(() => useToast());

    result.current.error('Error message', 'Error description');

    expect(toast.error).toHaveBeenCalledWith('Error message', {
      description: 'Error description',
      duration: 5000,
    });
  });

  it('should call sonner info toast with correct parameters', () => {
    const { result } = renderHook(() => useToast());

    result.current.info('Info message', 'Info description');

    expect(toast.info).toHaveBeenCalledWith('Info message', {
      description: 'Info description',
      duration: 3000,
    });
  });

  it('should call sonner warning toast with correct parameters', () => {
    const { result } = renderHook(() => useToast());

    result.current.warning('Warning message', 'Warning description');

    expect(toast.warning).toHaveBeenCalledWith('Warning message', {
      description: 'Warning description',
      duration: 4000,
    });
  });

  it('should handle apiError with Error object', () => {
    const { result } = renderHook(() => useToast());

    const testError = new Error('API failed');
    result.current.apiError(testError);

    expect(toast.error).toHaveBeenCalledWith('API Error', {
      description: 'API failed',
      duration: 5000,
    });
  });

  it('should handle apiError with unknown error type', () => {
    const { result } = renderHook(() => useToast());

    result.current.apiError('Some string error');

    expect(toast.error).toHaveBeenCalledWith('API Error', {
      description: 'An unexpected error occurred',
      duration: 5000,
    });
  });

  it('should call loading toast', () => {
    const { result } = renderHook(() => useToast());

    result.current.loading('Loading message');

    expect(toast.loading).toHaveBeenCalledWith('Loading message');
  });

  it('should call dismiss with toast ID', () => {
    const { result } = renderHook(() => useToast());

    result.current.dismiss('toast-id');

    expect(toast.dismiss).toHaveBeenCalledWith('toast-id');
  });

  it('should call dismiss without toast ID', () => {
    const { result } = renderHook(() => useToast());

    result.current.dismiss();

    expect(toast.dismiss).toHaveBeenCalledWith(undefined);
  });
});
