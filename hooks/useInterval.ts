import {useState,useEffect} from "react"
export default function useInterval(second: number) {
  const [time, setTime] = useState<number>(second * 1000);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(v => v - 1);
    }, time);
    return (() => {
      clearInterval(timeInterval);
    })
  });
  return time;
}