import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute import
import StudyLogPage from './page/StudyLogPage';
import AboutPage from './page/AboutPage';
import LoginPage from './page/LoginPage';
import PublicLogsPage from './page/PublicLogsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* 로그인이 필요한 페이지는 PrivateRoute로 감싸줍니다. */}
          <Route
            path="/"
            element={
              <StudyLogPage />

              // <PrivateRoute>
              //   <StudyLogPage />
              // </PrivateRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/public-logs" element={<PublicLogsPage />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;