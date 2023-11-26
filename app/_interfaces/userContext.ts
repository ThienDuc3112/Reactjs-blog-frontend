import { Dispatch, SetStateAction } from "react";

export interface IUserContext {
  user: { username: string; role: number[] };
  setUser: Dispatch<SetStateAction<IUserContext["user"]>>;
}
