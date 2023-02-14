/* eslint-disable react/no-danger */
import { MDXProvider } from "@mdx-js/react";
import classnames from "classnames";
import React from "react";

import { Button, Link, List } from "website-components";

import PropTypes from "../../utils/PropTypes";

import * as styles from "./CustomMDXProvider.module.css";

const basicPropTypes = {
  children: PropTypes.node,
};
const basicDefaultProps = {
  children: null,
};

const linkPropTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};
const linkDefaultProps = {
  children: null,
  href: null,
};

const Heading2 = ({ children }) => <h2 className="typo-h3">{children}</h2>;
Heading2.propTypes = basicPropTypes;
Heading2.defaultProps = basicDefaultProps;

const Heading3 = ({ children }) => <h3 className="typo-h3">{children}</h3>;
Heading3.propTypes = basicPropTypes;
Heading3.defaultProps = basicDefaultProps;

const Heading4 = ({ children }) => <h4 className="typo-h4">{children}</h4>;
Heading4.propTypes = basicPropTypes;
Heading4.defaultProps = basicDefaultProps;

const Heading5 = ({ children }) => <h5 className="typo-h5">{children}</h5>;
Heading5.propTypes = basicPropTypes;
Heading5.defaultProps = basicDefaultProps;

const Heading6 = ({ children }) => <h6 className="typo-h6">{children}</h6>;
Heading6.propTypes = basicPropTypes;
Heading6.defaultProps = basicDefaultProps;

const Paragraph = ({ children }) => (
  <p className="typo-body font-light">{children}</p>
);
Paragraph.propTypes = basicPropTypes;
Paragraph.defaultProps = basicDefaultProps;

const CustomList = ({ children }) => (
  <List className="my-4" iconClassName="text-blue-600">
    {children}
  </List>
);
CustomList.propTypes = basicPropTypes;
CustomList.defaultProps = basicDefaultProps;

const CustomOrderedlist = ({ children }) => (
  <List className="my-4" as="ol" iconClassName="text-blue-600">
    {children}
  </List>
);
CustomOrderedlist.propTypes = basicPropTypes;
CustomOrderedlist.defaultProps = basicDefaultProps;

const CustomListItem = ({ children, ...props }) => (
  <List.Item className="typo-body mt-4" {...props}>
    {children}
  </List.Item>
);
CustomListItem.propTypes = basicPropTypes;
CustomListItem.defaultProps = basicDefaultProps;

const CustomTable = ({ children }) => (
  <table className="my-4">{children}</table>
);
CustomTable.propTypes = basicPropTypes;
CustomTable.defaultProps = basicPropTypes;

const InlineLink = ({ href, children }) => (
  <Link to={href} className="text-blue-600">
    {children}
  </Link>
);
InlineLink.propTypes = linkPropTypes;
InlineLink.defaultProps = linkDefaultProps;

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const Pre = ({ children }) => (
  <span className="my-4 block overflow-x-auto whitespace-pre bg-gray-100 p-4">
    {children}
  </span>
);
Pre.propTypes = basicPropTypes;
Pre.defaultProps = basicDefaultProps;

const InlineCode = ({ children, className }) => (
  <pre
    className={classnames("inline overflow-x-auto bg-gray-100 p-1", className)}
  >
    {children}
  </pre>
);
InlineCode.propTypes = basicPropTypes;
InlineCode.defaultProps = basicDefaultProps;

const CustomMDXProvider = ({ children }) => (
  <>
    <MDXProvider
      components={{
        h1: Heading2,
        h2: Heading2,
        h3: Heading3,
        h4: Heading4,
        h5: Heading5,
        h6: Heading6,
        p: Paragraph,
        ul: CustomList,
        ol: CustomOrderedlist,
        li: CustomListItem,
        a: InlineLink,
        Button: Button,
        Table: CustomTable,
        code: Pre,
        inlineCode: InlineCode,
      }}
    >
      <div className={styles.content}>{children}</div>
    </MDXProvider>
  </>
);

CustomMDXProvider.propTypes = propTypes;
CustomMDXProvider.defaultProps = defaultProps;

export default CustomMDXProvider;
