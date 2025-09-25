import React from 'react';
import Navbar from './components/Navbar';

const Layout = ({ Component }) => {
  return (
    <div>
        <Navbar />
        <main>
            {Component && <Component />}
        </main>
    </div>
  )
}

export default Layout;