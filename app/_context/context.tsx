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
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState({
    username: "",
    role: [] as number[],
  });
  const [theme, setTheme] = useState(Theme.Light);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setUser({
              username: data.data.username,
              role: data.data.role,
            });
          });
        }
      })
      .catch((error) => {});
  }, []);
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
