/**
 * Authentication-related type definitions
 */

/**
 * User roles as defined in the API
 */
export type UserRole =
  | "ADMIN"

/**
 * User interface representing a user in the system
 * This is the user object returned from login/refresh/profile endpoints
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole; 
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request payload for login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Response structure for successful login
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string; 
    user: User;
  };
  timestamp: string;
}

/**
 * Response structure for token refresh
 */
export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
  timestamp: string;
}

/**
 * Response structure for user profile
 */
export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
  timestamp: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: User;
  timestamp: string;
}

/**
 * Request payload for forgot password
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Response structure for forgot password
 */
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp: string;
}

/**
 * 
 */
export interface ResetPasswordRequest {
  token: string;
  password: string;
}

/**
 * Response structure for reset password
 */
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp: string;
}

/**
 * Request payload for phone verification
 */
export interface VerifyPhoneRequest {
  phone: string;
  code: string;
}

/**
 * Response structure for phone verification
 */
export interface VerifyPhoneResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp: string;
}

/**
 * Response structure for follow/unfollow user
 */
export interface FollowUserResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp: string;
}

// Export all functions from auth.ts
export {
  refreshAccessToken,
  logoutUser,
  getUserProfile,
  requestPasswordReset,
  completePasswordReset,
  loginUser,
  updateUserProfile,
  changePassword,
} from './auth';
