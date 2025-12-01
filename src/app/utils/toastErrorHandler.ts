import { toast } from 'sonner';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const handleRtkQueryError = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) return;

  let message = 'An error occurred';
  let description = 'Please try again later';

  if ('status' in error) {
    if (error.status === 429) {
      message = 'Rate limit exceeded';
      description = 'Too many requests. Please wait a moment and try again.';
    } else if (error.status === 401) {
      message = 'Authentication required';
      description = 'Please check your API key configuration.';
    } else if (error.status === 403) {
      message = 'Access forbidden';
      description = 'You do not have permission to access this resource.';
    } else if (error.status === 404) {
      message = 'Not found';
      description = 'The requested resource could not be found.';
    } else if (error.status === 500) {
      message = 'Server error';
      description = 'Something went wrong on the server. Please try again later.';
    } else if (error.status === 'FETCH_ERROR') {
      message = 'Network error';
      description = 'Unable to reach the server. Check your internet connection.';
    } else if (error.status === 'PARSING_ERROR') {
      message = 'Data error';
      description = 'Failed to parse server response.';
    } else if (error.status === 'TIMEOUT_ERROR') {
      message = 'Request timeout';
      description = 'The request took too long. Please try again.';
    } else if (typeof error.status === 'number') {
      message = `Error ${error.status}`;
      description = 'An unexpected error occurred. Please try again.';
    }
  } else if ('message' in error) {
    message = 'Error';
    description = error.message || description;
  }

  toast.error(message, { description, duration: 5000 });
};
