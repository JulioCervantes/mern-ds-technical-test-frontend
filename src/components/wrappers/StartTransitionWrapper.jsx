import { startTransition } from "react";
import PropTypes from "prop-types";


export default function StartTransitionWrapper ({ children }) {
  startTransition(() => {
    console.log("StartTransitionWrapper",children);
    return children;
  });
  return null;
}

StartTransitionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};