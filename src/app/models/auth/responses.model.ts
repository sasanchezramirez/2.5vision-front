/**
 * Formato general de respuesta de la API
 */
export interface AuthResponse {
  apiCode: string;
  message: string;
  status: boolean;
  data: any;
}

/**
 * Códigos de error definidos por la API
 */
export enum ApiErrorCode {
  USER_EXISTS = 'KOU01',
  USER_NOT_FOUND = 'KOU02',
  INVALID_PASSWORD = 'KOU03',
  SUCCESS = 'KO000'
}
