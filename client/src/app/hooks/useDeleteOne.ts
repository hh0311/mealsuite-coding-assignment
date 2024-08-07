import useApi from './useApi';
import { replaceEndpointsToQuery } from '../helpers.ts';
import { QueryParams } from '../api';

type useDeleteOneProps = {
  url: string;
  params: QueryParams;
  successCallback?: () => void;
};
const useDeleteOne = ({ url, params, successCallback }: useDeleteOneProps) => {
  const { deleteOne } = useApi();

  const remove = async () => {
    try {
      await deleteOne(replaceEndpointsToQuery(url, params));
      successCallback?.();
    } catch {}
  };

  return {
    remove,
  };
};

export default useDeleteOne;
