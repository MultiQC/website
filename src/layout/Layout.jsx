import { useStaticQuery, graphql } from "gatsby";
import React from "react";

import { Footer } from "website-components";

import CookieBanner from "./CookieBanner";
import Header from "./Header";
import PropTypes from "../utils/PropTypes";

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
      <Footer logoImage={data.logo} jobsCount={10} />
    </>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
