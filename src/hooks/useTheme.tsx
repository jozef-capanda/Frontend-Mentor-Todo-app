import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "dark"
  );

  const toggleTheme = (): void => {
    const val = theme === "dark" ? "light" : "dark";

    setTheme(val);

    localStorage.setItem("theme", val);
  };

  useEffect(() => {
    document.documentElement.className = theme;
    console.log(theme);
  }, [theme]);

  return { theme, toggleTheme };
};
