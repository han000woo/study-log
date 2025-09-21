import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Context 생성
const AuthContext = createContext();

// 다른 컴포넌트에서 Context를 쉽게 사용하기 위한 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}

// Context를 제공하는 Provider 컴포넌트
export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // axios의 기본 헤더에 토큰을 설정하거나 제거하는 로직
  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authToken]);

  // 로그인 함수
  const login = async (email, password) => {
    // 실제 백엔드 로그인 API 주소로 변경해야 합니다.
    const response = await axios.post('/api/auth/login', { email, password });
    
    // 백엔드에서 받은 JWT 토큰
    const { token } = response.data;

    localStorage.setItem('token', token); // 토큰을 localStorage에 저장
    setAuthToken(token); // 상태 업데이트
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('token'); // localStorage에서 토큰 삭제
    setAuthToken(null); // 상태 업데이트
  };

  const value = {
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}