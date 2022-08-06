import axios, { AxiosError, AxiosResponse } from "axios";

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
});

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (e: AxiosError): Promise<AxiosError> => {
  return Promise.reject(e.response);
};

myAxios.interceptors.response.use(onResponse, onResponseError);

export default myAxios;
