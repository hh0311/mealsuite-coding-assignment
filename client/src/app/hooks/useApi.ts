import { api, RequestBody } from '../api';

const useApi = () => {
  const getOne = async (url: string) => {
    const data = await api.get(url);
    return data;
  };

  const getList = async (url: string) => {
    const data = await api.get(url);
    return data;
  };
  const createOne = async (url: string, body: RequestBody) => {
    const data = await api.create(url, body);
    return data;
  };
  const updateOne = async (url: string, body: RequestBody) => {
    const data = await api.update(url, body);
    return data;
  };

  const deleteOne = async (url: string) => {
    const data = await api.delete(url);
    return data;
  };

  return {
    getOne,
    getList,
    createOne,
    updateOne,
    deleteOne,
  };
};

export default useApi;
