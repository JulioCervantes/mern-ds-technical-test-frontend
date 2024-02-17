import Styles from "./styles";

export default function Button({ children }) {
  return (
    <button type="button" className={`${Styles.general}`}>
      {children}
    </button>
  );
}