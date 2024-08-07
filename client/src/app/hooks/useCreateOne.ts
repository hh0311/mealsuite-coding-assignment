import { useState } from 'react';
import useApi from './useApi';
import { RequestBody } from '../api';

type useCreateOneProps = {
  url: string;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
};

const useCreateOne = ({
  url,
  successCallback,
  errorCallback,
}: useCreateOneProps) => {
  const { createOne } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (body: RequestBody) => {
    setIsLoading(true);
    setError(null);
    try {
      await createOne(url, body);
      successCallback?.();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        errorCallback?.(error);
      } else {
        const unknownError = 'unknown error';
        setError(unknownError);
        errorCallback?.(new Error(unknownError));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    create,
    isLoading,
    error,
  };
};

export default useCreateOne;
