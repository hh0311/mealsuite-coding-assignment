import { useEffect, useState } from 'react';
import useApi from './useApi';
import { QueryParams } from '../api';
import { areObjectValuesEmpty, replaceEndpointsToQuery } from '../helpers.ts';

type useGetOneProps<T> = {
  url: string;
  params: QueryParams;
  fetchOnMount?: boolean;
};

const useGetOne = <T>({
  url,
  params,
  fetchOnMount = true,
}: useGetOneProps<T>) => {
  const { getOne } = useApi();
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!fetchOnMount) return;
      if (areObjectValuesEmpty(params)) return;
      const res = (await getOne(replaceEndpointsToQuery(url, params))) as T;
      setData(res);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [url, fetchOnMount]);

  return {
    data,
    isLoading,
    error,
    fetch,
  };
};

export default useGetOne;
