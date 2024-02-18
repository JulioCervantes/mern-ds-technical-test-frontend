import Styles from "./styles";

export default function Button({ children, className, onClick }) {
  return (
    <button type="button" className={`${Styles.general} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}