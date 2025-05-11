import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import LoadingScreen from './common/LoadingScreen';

// 코드 분할을 위한 지연 로딩
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const KakaoRedirect = lazy(() => import('./pages/LoginPage/KakaoRedirect'));

// 목록 페이지
const BoothListPage = lazy(() => import('./pages/ListPage/BoothListPage'));
const ShowListPage = lazy(() => import('./pages/ListPage/ShowListPage'));
const ScrapPage = lazy(() => import('./pages/ScrapPage/ScrapPage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));

// 상세 페이지
const BoothDetail = lazy(() => import('./pages/DetailPage/Booth/BoothDetail'));
const ShowDetail = lazy(() => import('./pages/DetailPage/Show/ShowDetail'));

// 부스/공연 관리 페이지
const BoothEdit = lazy(() => import('./pages/EditPage/boothEdit'));
const MenuEdit = lazy(() => import('./pages/EditPage/menuEdit'));
const MenuEditList = lazy(() => import('./pages/EditPage/menuEditList'));
const NoticeEdit = lazy(() => import('./pages/EditPage/noticeEdit'));
const ShowEdit = lazy(() => import('./pages/EditPage/showEdit'));

// 마이페이지
const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const MyPageCode = lazy(() => import('./pages/MyPage/MyPageCode'));

// 정보 페이지
const SchedulePage = lazy(() => import('./pages/SchedulePage/SchedulePage'));
const NoticePage = lazy(() => import('./pages/NoticePage/NoticesPage'));
const FacilityPage = lazy(() => import('./pages/FacilityPage/FacilityPage'));
const CommitteePage = lazy(() => import('./pages/CommitteePage/CommitteePage'));
const FleamarketPage = lazy(
  () => import('./pages/FleamarketPage/FleamarketPage')
);
const MakersPage = lazy(() => import('./pages/MakersPage/MakersPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* 메인 & 인증 */}
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/oauth/callback/kakao' element={<KakaoRedirect />} />

          {/* 목록 페이지 */}
          <Route path='/boothlist' element={<BoothListPage />} />
          <Route path='/showlist' element={<ShowListPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/scrap' element={<ScrapPage />} />

          {/* 상세 페이지 */}
          <Route path='/boothdetail/:id' element={<BoothDetail />} />
          <Route path='/showdetail/:id' element={<ShowDetail />} />

          {/* 부스/공연 관리 */}
          <Route path='/boothEdit/:id' element={<BoothEdit />} />
          <Route path='/menuEdit' element={<MenuEdit />} />
          <Route path='/menuEdit/:id' element={<MenuEdit />} />
          <Route path='/menuEditlist' element={<MenuEditList />} />
          <Route path='/noticeEdit' element={<NoticeEdit />} />
          <Route path='/showEdit/:id' element={<ShowEdit />} />

          {/* 마이페이지 */}
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/mypage/code' element={<MyPageCode />} />

          {/* 정보 페이지 */}
          <Route path='/schedule' element={<SchedulePage />} />
          <Route path='/notice' element={<NoticePage />} />
          <Route path='/facility' element={<FacilityPage />} />
          <Route path='/committee' element={<CommitteePage />} />
          <Route path='/fleamarket' element={<FleamarketPage />} />
          <Route path='/makers' element={<MakersPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
