import { useState } from 'react';
import { apiClient } from '../../api/client';
import type { ApiResponse } from '../../types/api';
import type { LoginRequest, LoginResponseData, MeResponseData } from '../../types/auth/auth';

/**
 * 로그인 API를 호출하는 커스텀 훅
 */
export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    username: string,
    password: string
  ): Promise<LoginResponseData | null> => {
    setIsLoading(true);
    setError(null);

    const requestBody: LoginRequest = {
      username,
      password,
    };

    try {
      const response = await apiClient.post<ApiResponse<LoginResponseData>>(
        '/auth/login',
        requestBody
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        const errorMessage = response.data.error?.message || '로그인에 실패했습니다.';
        setError(errorMessage);
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(errorMessage);
      console.error('로그인 실패:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
}

/**
 * 내 정보 조회 API를 호출하는 커스텀 훅
 */
export function useGetMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<MeResponseData | null>(null);

  const getMe = async (): Promise<MeResponseData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<ApiResponse<MeResponseData>>(
        '/auth/me'
      );

      if (response.data.success && response.data.data) {
        setUser(response.data.data);
        return response.data.data;
      } else {
        const errorMessage = response.data.error?.message || '사용자 정보를 불러오지 못했습니다.';
        setError(errorMessage);
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '사용자 정보를 불러오지 못했습니다.';
      setError(errorMessage);
      console.error('사용자 정보 조회 실패:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getMe,
    isLoading,
    error,
    user,
  };
}
