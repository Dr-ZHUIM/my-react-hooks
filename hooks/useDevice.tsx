import { useEffect, useState } from "react";

export default function useDevice(){
  const [device,setDevice] = useState<"mobile" | "pc" | "">("");
  useEffect(()=>{
    let str:"mobile" | "pc" | "" = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) ? 'mobile': 'pc';
    setDevice(str);
  },[]);
  return device; 
}