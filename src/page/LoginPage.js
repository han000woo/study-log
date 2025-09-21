import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 곧 만들 AuthContext를 사용합니다.

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // login 함수를 AuthContext에서 가져옵니다.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // login 함수를 호출하여 API 요청 및 상태 업데이트를 처리합니다.
      await login(email, password);
      navigate('/'); // 로그인 성공 시 홈으로 이동
    } catch (err) {
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit} className="log-form">
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;