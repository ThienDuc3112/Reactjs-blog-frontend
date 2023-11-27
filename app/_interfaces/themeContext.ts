import { Dispatch, SetStateAction } from "react";

export enum Theme {
  Light,
  Dark,
}

export interface IThemeContext {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}
