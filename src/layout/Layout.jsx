import React from 'react';
import CookieBanner from './CookieBanner';
import Header from './Header';
import Footer from './Footer';
import PropTypes from '../utils/PropTypes';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const Layout = ({ children, location }) => {
  return (
    <>
      <Header location={location} />
      <main className="min-h-screen">
        {children}
      </main>
      <CookieBanner />
      <Footer />
    </>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
