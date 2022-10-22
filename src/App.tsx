import React from 'react';
import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Path from './constants/Path';
import City from './pages/City/City';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={Path.Main} element={<Main />} />
        <Route path={`${Path.City}/:city`} element={<City />} />
        <Route path={Path.NotAvailablePage} element={<Main />} />
      </Routes>
    </>
  );
};

export default App;