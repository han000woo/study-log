import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  // authToken 대신 isLoading과 isAuthenticated 상태를 가져옵니다.
  const { isAuthenticated, isLoading } = useAuth();

  // 1. 인증 상태를 확인하는 중(로딩 중)이면, 로딩 메시지를 보여줍니다.
  if (isLoading) {
    return <div>Loading...</div>; // 또는 <Spinner /> 컴포넌트
  }

  // 2. 로딩이 끝났고, 인증된 상태라면 요청된 페이지(children)를 보여줍니다.
  // 3. 로딩이 끝났는데, 인증이 안 된 상태라면 로그인 페이지로 보냅니다.
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;