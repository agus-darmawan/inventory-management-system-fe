export interface RegisterFormData {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}
