import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BoothEdit from './pages/EditPage/boothEdit';
import MenuEdit from './pages/EditPage/menuEdit';
import MenuEditList from './pages/EditPage/menuEditList';
import NoticeEdit from './pages/EditPage/noticeEdit';
import ShowEdit from './pages/EditPage/showEdit';

import BoothDetail from './pages/DetailPage/Booth/BoothDetail';
import ShowDetail from './pages/DetailPage/Show/ShowDetail';
import MyPage from './pages/MyPage/MyPage';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import KakaoRedirect from './pages/LoginPage/KakaoRedirect';
import BoothListPage from './pages/ListPage/BoothListPage';
import ShowListPage from './pages/ListPage/ShowListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/boothEdit' element={<BoothEdit />} />
        <Route path='/menuEdit' element={<MenuEdit />} />
        <Route path='/menuEdit/:id' element={<MenuEdit />} />
        <Route path='/menuEditlist' element={<MenuEditList />} />
        <Route path='/noticeEdit' element={<NoticeEdit />} />
        <Route path='/showEdit' element={<ShowEdit />} />
        <Route path='/showdetail' element={<ShowDetail />} />
        <Route path='/boothdetail' element={<BoothDetail />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth/callback/kakao' element={<KakaoRedirect />} />
        <Route path='/boothlist' element={<BoothListPage />} />
        <Route path='/showlist' element={<ShowListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
