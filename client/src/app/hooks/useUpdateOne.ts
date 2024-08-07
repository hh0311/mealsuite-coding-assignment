import { useState } from 'react';
import useApi from './useApi';
import { QueryParams, RequestBody } from '../api';
import { replaceEndpointsToQuery } from '../helpers.ts';

type useUpdateOneProps = {
  url: string;
  params: QueryParams;
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
};
// const useUpdateOne = ({ url, params, successCallback }: useUpdateOneProps) => {
//   const { updateOne } = useApi();

//   const update = async (body?: RequestBody, extraParams?: QueryParams) => {
//     try {
//       await updateOne(
//         replaceEndpointsToQuery(url, { ...params, ...extraParams }),
//         body || {}
//       );
//       successCallback?.();
//     } catch (error) {}
//   };

//   return {
//     update,
//   };
// };

// export default useUpdateOne;

const useUpdateOne = ({
  url,
  params,
  successCallback,
  errorCallback,
}: useUpdateOneProps) => {
  const { updateOne } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (body?: RequestBody, extraParams?: QueryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateOne(
        replaceEndpointsToQuery(url, { ...params, ...extraParams }),
        body || {}
      );
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
    update,
    isLoading,
    error,
  };
};

export default useUpdateOne;
