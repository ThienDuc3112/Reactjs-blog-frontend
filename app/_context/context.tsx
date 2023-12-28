"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IUserContext } from "../_interfaces/userContext";
import { IThemeContext } from "../_interfaces/themeContext";
import { Theme } from "../_interfaces/themeContext";

const UserContext = createContext<IUserContext>({
  user: {
    username: "",
    role: [],
  },
  setUser: () => {},
});

const ThemeContext = createContext<IThemeContext>({
  theme: Theme.Light,
  setTheme: () => {},
});

const ContextProvider = ({
  children,
  username,
  role,
}: {
  children: React.ReactNode;
  username?: string;
  role?: number[];
}): JSX.Element => {
  const [user, setUser] = useState({
    username: username ?? "",
    role: role ?? [],
  });
  const [theme, setTheme] = useState(Theme.Light);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div
          className={`context ${
            theme == Theme.Light ? "lightMode" : "darkMode"
          }`}
        >
          {children}
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

const useThemeContext = () => useContext(ThemeContext);

export { useUserContext, useThemeContext, ContextProvider };
