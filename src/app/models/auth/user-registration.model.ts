/**
 * Modelo para petición de registro de nuevo usuario
 */
export interface NewUserInput {
  username: string;
  password: string;
  profile_id: number;
  status_id: number;
  contact_info: string;
}

/**
 * Respuesta de la API para creación de usuario
 */
export interface NewUserResponse {
  id: number;
  username: string;
  creation_date: string;
  profile_id: number;
  status_id: number;
}
