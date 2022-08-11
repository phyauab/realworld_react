import axios, { AxiosError, AxiosResponse } from "axios";
import { ValidationErrorResponse } from "../models/common/ValidationErrorResponse";

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
});

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (e: AxiosError): Promise<AxiosError> => {
  if (isAxiosError<ValidationErrorResponse>(e)) {
    return Promise.reject(e);
  }
  return Promise.reject(e);
};

myAxios.interceptors.response.use(onResponse, onResponseError);

export function isAxiosError<ValidationErrorResponse>(
  error: unknown
): error is AxiosError<ValidationErrorResponse> {
  return axios.isAxiosError(error);
}

export default myAxios;
