import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppError } from './appError';

type TApiError = {
  request: {
    data: any;
    params: any;
    headers: any;
    baseURL?: string;
    url?: string;
    method?: string;
  };
  response?: {
    status: number;
    data?: any;
  };
  error: any;
};
export class ApiError extends AppError<TApiError> {
  public isApiError = true;
  public readonly status: number;
  public readonly data: any;

  constructor(
    request: AxiosRequestConfig | undefined,
    res: AxiosResponse | undefined,
    error: any
  ) {
    const response = { status: res?.status ?? -1, data: res?.data ?? null };

    delete error.request;
    delete error.response;
    delete error.config;

    super(
      'api-error',
      {
        request: {
          baseURL: request?.baseURL,
          url: request?.url,
          method: request?.method,
          data: request?.data,
          params: request?.params,
          headers: request?.headers,
        },
        response,
        error,
      },
      true
    );
    this.status = response.status;
    this.data = response.data;
  }
}
