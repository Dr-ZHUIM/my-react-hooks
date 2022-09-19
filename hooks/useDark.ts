import { useState,useCallback } from "react";

export default function useDark(initialState:boolean): [string, React.MouseEventHandler<any>] {
  const [darkMode, setDarkMode] = useState(initialState);
  const eventListener = useCallback(()=>{
    setDarkMode(v => !v);
  },[])
  return [String(darkMode), eventListener];
}
