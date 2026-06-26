import { useCallback, useEffect, useState } from "react";

export type Theme = "night" | "sunset";

const STORAGE_KEY = "moon-portfolio-theme";

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "night";
    return (localStorage.getItem(STORAGE_KEY) as Theme) || "night";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "night" ? "sunset" : "night"));
  }, []);

  return [theme, toggle];
}
