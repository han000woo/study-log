import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../static/Navbar.css";

function Navbar() {
  // 1. 모바일 메뉴의 열림/닫힘 상태를 관리하는 state 추가
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false); // 로그아웃 시 메뉴 닫기
  };

  // 2. 메뉴 항목을 클릭했을 때 메뉴를 닫는 함수
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='navbar-container'>
      <nav className="navbar">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          공부 일지
        </Link>

        {/* --- 데스크톱용 메뉴 --- */}
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>홈</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/public-logs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>학습 현황</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>소개</NavLink>
          </li>
          <li className="nav-item">
            {authToken ? (
              <button onClick={handleLogout} className="nav-button">로그아웃</button>
            ) : (
              <NavLink to="/login" className="nav-link">로그인</NavLink>
            )}
          </li>
        </ul>

        {/* --- 햄버거 메뉴 아이콘 (모바일용) --- */}
        <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>
      {/* --- 모바일용 메뉴 (isMenuOpen이 true일 때만 표시) --- */}
      <ul className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>홈</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/public-logs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>학습 현황</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>소개</NavLink>
        </li>
        <li className="nav-item">
          {authToken ? (
            <button onClick={handleLogout} className="nav-button">로그아웃</button>
          ) : (
            <NavLink to="/login" className="nav-link" onClick={closeMenu}>로그인</NavLink>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;