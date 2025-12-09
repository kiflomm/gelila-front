import { axiosPublicClient, axiosProtectedClient } from '@/lib/axios-client';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ProfileResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../index';

// Refresh token API function
export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const response = await axiosProtectedClient.post('/auth/refresh');
  return response.data;
};

// Logout API function
export const logoutUser = async (): Promise<void> => {
  await axiosProtectedClient.post('/auth/logout');
};

// Get user profile API function
export const getUserProfile = async (): Promise<ProfileResponse> => {
    const response = await axiosProtectedClient.get('/auth/profile');
  return response.data;
};

// Forgot password API function
export const requestPasswordReset = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await axiosPublicClient.post('/auth/forgot-password', data);
  return response.data;
};

// Reset password API function
export const completePasswordReset = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await axiosPublicClient.post('/auth/reset-password', data);
  return response.data;
};

// Login API function
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosPublicClient.post('/auth/login', credentials);
  return response.data;
};
