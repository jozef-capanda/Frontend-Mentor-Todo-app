import sunIcon from "../assets/icons/icon-sun.svg";
import moonIcon from "../assets/icons/icon-moon.svg";

import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header">
      <h1 className="header__title">Todo</h1>
      <button
        onClick={toggleTheme}
        title={theme === "light" ? "Dark theme" : "Light theme"}
        aria-label="Change theme"
        type="button"
        className="btn"
      >
        <img
          className="header__icon"
          src={theme === "light" ? moonIcon : sunIcon}
          alt=""
        />
      </button>
    </header>
  );
};

export default Header;
