import { useState, useCallback } from 'react';
import { api } from '../services/api';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useApi = <T = any>(options?: UseApiOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (method: string, url: string, payload?: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api[method as keyof typeof api](url, payload);
      setData(response.data);
      options?.onSuccess?.(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
      options?.onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const get = useCallback((url: string) => execute('get', url), [execute]);
  const post = useCallback((url: string, data?: any) => execute('post', url, data), [execute]);
  const put = useCallback((url: string, data?: any) => execute('put', url, data), [execute]);
  const del = useCallback((url: string) => execute('delete', url), [execute]);

  return { data, isLoading, error, get, post, put, del, execute };
};
