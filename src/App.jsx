import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BoothDetail from './pages/DetailPage/Booth/BoothDetail';
import ShowDetail from './pages/DetailPage/Show/ShowDetail';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import KakaoRedirect from './pages/LoginPage/KakaoRedirect';
import BoothListPage from './pages/ListPage/BoothListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/showdetail' element={<ShowDetail />} />
        <Route path='/boothdetail' element={<BoothDetail />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth/callback/kakao' element={<KakaoRedirect />} />
        <Route path='/boothlist' element={<BoothListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
