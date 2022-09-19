import { useState,useCallback } from "react";

export default function useDark(initialState:boolean): [boolean, React.MouseEventHandler<any>] {
  const [value, setValue] = useState(initialState);
  const eventListener = useCallback(()=>{
    setValue(v => !v);
  },[])
  return [value, eventListener];
}
