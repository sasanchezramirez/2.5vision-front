/**
 * Modelo para petición de cambio de contraseña
 */
export interface ChangePasswordInput {
  old_password: string;
  new_password: string;
  username: string;
}
