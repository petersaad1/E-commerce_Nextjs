'use client';

import { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  dark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggle: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    setMounted(true);
  }, [dark]);

  const toggle = () => {
    setDark((prev) => {
      localStorage.setItem("darkMode", String(!prev));
      return !prev;
    });
  };

  if (!mounted) {
    const storedTheme =
      typeof window !== "undefined" ? localStorage.getItem("darkMode") : "false";
    const isDark = storedTheme === "true";
    return <div className={`w-screen h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`} />;
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
