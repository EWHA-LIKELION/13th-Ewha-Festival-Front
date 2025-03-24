import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import LoginPage from './pages/login/LoginPage';
import KakaoRedirect from './pages/login/KakaoRedirect';
import BoothListPage from './pages/list/BoothListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth/callback/kakao' element={<KakaoRedirect />} />
        <Route path='/boothlist' element={<BoothListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
