import React from 'react';
// import Navbar from './components/Navbar';
import Navbar from './components/AppNavbar/Navbar';

const Layout = ({ Component, hideNavbar = false }) => {
  return (
    <div>
        {!hideNavbar && <Navbar />}
        <main>
            {Component && <Component />}
        </main>
    </div>
  )
}

export default Layout;