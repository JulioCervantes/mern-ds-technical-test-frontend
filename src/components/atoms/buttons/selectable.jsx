import { useState } from "react";
import Styles from "./styles";
import PropTypes from "prop-types";

export default function Selectable({ onChange, children, selected: defaultSelected }) {
  const [selected, setSelected] = useState(defaultSelected);
  
  const handleClick = () => {
    const newState = !selected;
    setSelected(newState);
    onChange(newState);
  };

  return (
    <button type="button" className={`${Styles.general} ${Styles.selectable} ${selected ? Styles.active : Styles.inactive}`} onClick={handleClick}>
      {children}
    </button>
  );
}

Selectable.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
};

Selectable.defaultProps = {
  selected: false,
};
