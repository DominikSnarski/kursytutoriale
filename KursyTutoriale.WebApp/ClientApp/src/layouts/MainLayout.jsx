/* eslint-disable */
import React from 'react';
import Footer from './Shared/Footer';
import NavBar from './Shared/NavBar';

const MainLayout = (props) => (
  <main id="Home">
    <NavBar />
    {props.children}
    <Footer />
  </main>
);

export default MainLayout;
