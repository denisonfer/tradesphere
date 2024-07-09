import { decodeJWT } from '@utils/decodeJWT';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { useToast } from 'native-base';
import { BASE_API_URL } from 'src/envs';
import { ApiError } from 'src/errors/apiError';
import { useAuthStore } from 'src/stores/useAuthStore';

type TApiClientRequestDTO = {
  method: Method;
  url: string;
  data: any;
  headers?: any;
  isRefresh?: boolean;
  isPaginated?: boolean;
};

export class ApiClient {
  private refreshTokenInProgress: Promise<string> | null = null;

  public async get<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>({ method: 'GET', url, ...params });
  }

  public async post<T = any>(
    url: string,
    body?: any,
    params?: any
  ): Promise<T> {
    return this.request<T>({ method: 'POST', url, data: body, ...params });
  }

  public async put<T = any>(url: string, body?: any): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data: body });
  }

  public async patch<T = any>(url: string, body?: any): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, data: body });
  }

  public async del<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, ...params });
  }

  private async request<T = any>({
    method,
    url,
    data,
    headers,
    isRefresh,
    isPaginated = false,
    ...params
  }: TApiClientRequestDTO): Promise<T> {
    const formattedParams = { ...params };

    Object.entries(formattedParams).forEach(([key, value]) => {
      if (!value) delete (formattedParams as any)[key];
    });

    try {
      const config: AxiosRequestConfig = {
        baseURL: BASE_API_URL,
        url,
        method,
        headers: {
          ...(headers ?? {}),
          ...(await this.getHeaders(data, isRefresh)),
        },
        params: method === 'GET' ? formattedParams : undefined,
        data:
          method === 'POST' || method === 'PUT' || method === 'PATCH'
            ? data
            : undefined,
      };
      const response = await axios.request(config);
      if (isPaginated) return response?.data;

      return response?.data?.data ?? response?.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: AxiosError): never {
    if (!error?.isAxiosError) throw error;

    throw new ApiError(error?.config, error?.response, error);
  }

  private async getHeaders(data: any, isRefresh?: boolean) {
    const headers: Record<string, string> = {
      'Content-Type':
        data instanceof FormData ? 'multipart/form-data' : 'application/json',
      Origin: BASE_API_URL,
    };

    if (isRefresh) return headers;
    const authToken = await this.getAuthToken();

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    return headers;
  }

  public getAuthToken() {
    const { token, refreshToken } = useAuthStore.getState();
    if (!token) return undefined;

    const validSession = this.verifyToken(token);

    if (validSession) {
      return validSession;
    }

    if (!refreshToken) {
      return undefined;
    }

    return this.refreshToken();
  }

  private refreshToken() {
    const { refreshToken } = useAuthStore.getState();
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = this.request({
        method: 'POST',
        url: '/sessions/refresh-token',
        data: {},
        isRefresh: true,
        headers: { refreshToken },
      })
        .then(({ token }) => {
          useAuthStore.getState().setAccessToken(token);
          return token;
        })
        .catch((error) => {
          useToast().show({
            description: 'Sessão expirada, por favor refaça o login!',
            placement: 'top',
            bg: 'error.500',
            duration: 3000,
          });
          useAuthStore.getState().clearTokens();
        })
        .finally(() => {
          this.refreshTokenInProgress = null;
        });
    }

    return this.refreshTokenInProgress;
  }

  private verifyToken(token: string): string | undefined {
    try {
      const exp = decodeJWT(token).exp;
      const isExpired = exp < Date.now() / 1000;

      if (isExpired) {
        return undefined;
      }

      return token;
    } catch (error) {
      return undefined;
    }
  }
}
