import { graphql, useStaticQuery } from "gatsby";
import React from "react";

// import { Footer } from "website-components";

import PropTypes from "../utils/PropTypes";
import CookieBanner from "./CookieBanner";
import Footer from "./Footer";
import Header from "./Header";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "seqera-logo-white.png" }) {
        childImageSharp {
          gatsbyImageData(height: 28, width: 200, placeholder: NONE)
        }
      }
    }
  `);

  return (
    <>
      <Header location={location} />
      <main className="min-h-screen">{children}</main>
      <CookieBanner />
      <Footer logoImage={data.logo} />
    </>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
