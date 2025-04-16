/**
 * Modelo para petición de inicio de sesión
 */
export interface LoginInput {
  username: string;
  password: string;
}

/**
 * Datos de respuesta después de un login exitoso
 */
export interface LoginResponseData {
  access_token: string;
  token_type: string;
}
