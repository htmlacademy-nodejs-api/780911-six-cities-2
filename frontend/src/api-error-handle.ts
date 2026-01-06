import { AxiosError } from 'axios';
import { ApiErrorResponse } from './types/types';

// TODO: remove logs
export const apiErrorHandle = (error: AxiosError) => {
  if (!error.response) {
    return 'Network error. Please check your connection.';
  }

  const data = error.response.data as ApiErrorResponse;
  console.log('apiErrorHandle');
  console.log({ data });
  console.log('------------------');
  if (data.errorType === 'VALIDATION_ERROR' && Array.isArray(data.details)) {
    console.log('VALIDATION_ERROR');
    return data.details.map((detail) => detail.messages.join(', ')).join('\n');
  }

  return data.message || `Request failed with status ${error.response.status}`;
};
