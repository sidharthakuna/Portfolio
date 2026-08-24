import { useState, useEffect, useCallback } from "react";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

/**
 * Custom hook to manage theme ('dark' | 'light') with localStorage and document attribute sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage write errors (e.g. private browsing)
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setExplicitTheme = useCallback((nextTheme) => {
    setTheme(nextTheme === "light" ? "light" : "dark");
  }, []);

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setTheme: setExplicitTheme,
  };
}
