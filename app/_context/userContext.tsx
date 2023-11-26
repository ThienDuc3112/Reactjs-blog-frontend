"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IUserContext } from "../_interfaces/userContext";

const UserContext = createContext<IUserContext>({
  user: {
    username: "",
    role: [],
  },
  setUser: () => {},
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
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      credentials: "include",
      mode: "cors",
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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContext, useUserContext, ContextProvider };
