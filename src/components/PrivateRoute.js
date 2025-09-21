import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { authToken } = useAuth();
  
  // authToken이 없으면 로그인 페이지로 리디렉션
  return authToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;