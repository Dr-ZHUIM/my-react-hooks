import {useState,useEffect} from "react"
export default function useInterval(second: number) {
  const [time, setTime] = useState<number>(second);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime( v => {
        if(v === 0) return 0;
        return v - 1
      });
    }, 1000);
    return (() => {
      clearInterval(timeInterval);
    })
  },[]);
  return time;
}
