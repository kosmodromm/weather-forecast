import Path from '../../constants/Path';
import Icon from '../Icon/Icon';
import { Link, Outlet } from 'react-router-dom';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper">
      <header className="flex flex-row justify-center items-center h-20">
        <Link to={Path.Main}>
          <Icon name="logo" className="width-50 height-50 fill-[#FF8F40]" />
        </Link>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
