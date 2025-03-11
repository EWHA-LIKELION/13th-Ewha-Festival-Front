import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/test';
import BoothDetail from './pages/DetailPage/Booth/BoothDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path='/boothdetail' element={<BoothDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
