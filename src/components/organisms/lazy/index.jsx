import React from "react";
import PropTypes from "prop-types";

export default function Lazy({ importer }) {
  const Component = React.lazy(importer);
  return <Component />;
}

Lazy.propTypes = {
  importer: PropTypes.func.isRequired,
};