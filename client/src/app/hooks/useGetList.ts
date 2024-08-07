import { useEffect, useState } from 'react';
import useApi from './useApi';

type useGetListProps<T> = {
  url: string;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
};

const useGetList = <T>({
  url,
  successCallback,
  errorCallback,
}: useGetListProps<T>) => {
  const { getList } = useApi();
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = (await getList(url)) as T[];
      setData(res);
      successCallback?.();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        errorCallback?.(error);
      } else {
        const unknownError = 'unkown error';
        setError(unknownError);
        errorCallback?.(new Error(unknownError));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [url]);

  return {
    data,
    isLoading,
    error,
    fetch,
  };
};

export default useGetList;
