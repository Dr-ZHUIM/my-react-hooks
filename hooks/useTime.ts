import { useState,useEffect } from "react";

export default function useTime(){
    const [time,setTime] = useState(new Date());
    useEffect(()=>{
        const intervalId = window.setInterval(()=>{
            setTime(new Date());
        },1000);
        return ()=>{
            window.clearInterval(intervalId)
        }
    },[]);
    return time;
}