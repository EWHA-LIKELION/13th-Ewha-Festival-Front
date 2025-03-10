import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/test';
import LoginPage from './pages/login/LoginPage';
import KakaoRedirect from './pages/login/KakaoRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth/callback/kakao' element={<KakaoRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
