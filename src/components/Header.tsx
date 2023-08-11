import sunIcon from "../assets/icons/icon-sun.svg";
import moonIcon from "../assets/icons/icon-moon.svg";
import { useEffect, useState } from "react";

type Theme = "light-theme" | "dark-theme";

const Header = () => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "dark-theme"
  );

  const toggleTheme = (): void => {
    const val = theme === "dark-theme" ? "light-theme" : "dark-theme";

    setTheme(val);

    document.documentElement.className = val;
    localStorage.setItem("theme", val);
  };

  useEffect(() => {
    document.documentElement.className = theme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="header">
      <h1 className="header__title">Todo</h1>
      <button
        onClick={toggleTheme}
        title={theme === "light-theme" ? "Dark theme" : "Light theme"}
        aria-label="Change theme"
        type="button"
        className="btn"
      >
        <img
          className="header__icon"
          src={theme === "light-theme" ? moonIcon : sunIcon}
          alt=""
        />
      </button>
    </header>
  );
};

export default Header;
