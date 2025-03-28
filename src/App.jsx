import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BoothDetail from './pages/DetailPage/Booth/BoothDetail';
import ShowDetail from './pages/DetailPage/Show/ShowDetail';
import MyPage from './pages/MyPage/MyPage';
import MainPage from './pages/main/MainPage';
import LoginPage from './pages/login/LoginPage';
import KakaoRedirect from './pages/login/KakaoRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/showdetail' element={<ShowDetail />} />
        <Route path='/boothdetail' element={<BoothDetail />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth/callback/kakao' element={<KakaoRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
