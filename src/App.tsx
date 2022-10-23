import React from 'react';
import Main from './pages/Main/Main';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Path from './constants/Path';
import City from './pages/City/City';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Main />} />
    <Route path={`${Path.City}/:city`} element={<City />} />
    <Route path={Path.UnknownPage} element={<Main />} />
  </Route>
));

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;