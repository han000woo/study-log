import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute import
import StudyLogPage from './page/StudyLogPage';
import AboutPage from './page/AboutPage';
import LoginPage from './page/LoginPage';
import PublicLogsPage from './page/PublicLogsPage';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider가 Navbar와 Routes를 모두 감싸도록 수정 */}
      <AuthProvider>
        <Navbar /> {/* ✅ 이제 인증 상태 변화를 알 수 있음 */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                // <StudyLogPage />
                <PrivateRoute>
                  <StudyLogPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/public-logs" element={<PublicLogsPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;