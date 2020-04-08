/* eslint-disable */
import React from 'react';
import Footer from './Shared/Footer';
import NavBar from './Shared/NavBar';

const MainLayout = (props) => (
  <main className="pt-5 mt-5" id="Home">
    <NavBar />
    {props.children}
    <Footer />
  </main>
);

export default MainLayout;
