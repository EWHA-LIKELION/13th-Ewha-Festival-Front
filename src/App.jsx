import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/test';
import BoothEdit from './pages/EditPage/boothEdit';
import MenuEdit from './pages/EditPage/menuEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path='/boothEdit' element={<BoothEdit />} />
        <Route path='/menuEdit' element={<MenuEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
