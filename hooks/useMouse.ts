import {useState,useEffect} from "react"

export default function useMouse(){
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    useEffect(()=>{
        const handleMouseMouve = (e:MouseEvent) => {
            setX(e.clientX);
            setY(e.clientY)
        }
        window.addEventListener("mousemove",handleMouseMouve);
        return (()=>{
            window.removeEventListener("mousemove",handleMouseMouve)
        })
    },[]);
    return [x,y]
}