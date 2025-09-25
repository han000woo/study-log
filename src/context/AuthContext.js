import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { login as loginAPI, logout as logoutAPI } from "../api/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // 여러 상태를 한 번에 관리
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: null,
    isAuthenticated: false,
    isLoading: true, // 앱 초기 로딩 상태
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedUser = jwtDecode(accessToken);
        // 토큰 만료 시간 체크 (선택 사항이지만 권장)
        if (decodedUser.exp * 1000 > Date.now()) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          setAuthState((prevState) => ({
            ...prevState,
            user: {
              email: decodedUser.sub,
              roles: decodedUser.auth.split(","),
            },
            isAuthenticated: true,
          }));
        } else {
          // 토큰이 만료된 경우
          localStorage.clear();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
      }
    }
    setAuthState((prevState) => ({ ...prevState, isLoading: false }));
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      const decodedUser = jwtDecode(accessToken);

      setAuthState({
        accessToken,
        refreshToken,
        user: { email: decodedUser.sub, roles: decodedUser.auth.split(",") },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
      // 로그인 실패 시 에러를 다시 던져서 컴포넌트에서 처리할 수 있게 함
      throw error;
    }
  };

  const logout = async () => {
    try {
      // 서버에 로그아웃 요청을 보내 Redis의 Refresh Token을 삭제

      await logoutAPI();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // API 호출 성공 여부와 관계없이 로컬 상태는 초기화
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];

      setAuthState({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  // context로 내려줄 값
  const value = {
    ...authState,
    login,
    logout,
  };

  // 로딩 중일 때는 아무것도 렌더링하지 않거나 로딩 스피너를 보여줌
  if (authState.isLoading) {
    return <div>Loading...</div>; // 또는 <Spinner />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}