import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changePassword, updateUserProfile } from '@/api/auth';
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/api/auth';
import { useAuthStore } from '@/stores/auth-store';

const PROFILE_QUERY_KEY = ['auth', 'profile'] as const;

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<UpdateProfileResponse, unknown, UpdateProfileRequest>({
    mutationFn: (data) => updateUserProfile(data),
    onSuccess: (response) => {
      const nextUser = response.data;
      setUser(nextUser);
      queryClient.setQueryData(PROFILE_QUERY_KEY, response);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<ChangePasswordResponse, unknown, ChangePasswordRequest>({
    mutationFn: (data) => changePassword(data),
  });
};


