import { useEffect, useState } from "react";

export default function useListener(second: number) {
  const [done, setDone] = useState(false);
  let time: any;
  const listener = () => {
    setDone(false);
    clearTimeout(time!);
    time = setTimeout(() => {
      setDone(true);
    }, second * 1000);
  };
  useEffect(() => {
    time = setTimeout(() => {
      setDone(true);
    }, second * 1000);
    document.documentElement.addEventListener("click", listener);
    document.documentElement.addEventListener("touchmouve", listener);
    return (() => {
      time = null;
      document.documentElement.removeEventListener("click", listener);
      document.documentElement.removeEventListener("touchmouve", listener);
    });
  }, [second])
  return done;
}