import {useState,useEffect,useRef} from "react";

export default function useDrag():[React.RefObject<any>,string,number,number]{
  const [isDragging,setIsDragging] = useState(false);
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  let startOffsetX = 0;
  let startOffsetY = 0;
  const ref = useRef<HTMLElement>(null);
  const handleDragStart = (e:DragEvent) => {
    setIsDragging(true);
    ref.current!.style.userSelect = "none";
    ref.current!.style.cursor = "move";
    startOffsetX = e.offsetX;
    startOffsetY = e.offsetY;
  }
  const handleDrag = (e:DragEvent) => {
    setX(e.clientX - startOffsetX);
    setY(e.clientY - startOffsetY);
  };
  const handleDragEnd = (e:DragEvent) => {
    setIsDragging(false);
    setX(e.clientX - startOffsetX);
    setY(e.clientY - startOffsetY);
    ref.current!.style.left = (e.clientX - startOffsetX) + "px";
    ref.current!.style.top = (e.clientY - startOffsetY) + "px";
    ref.current!.style.cursor = "initail";
    startOffsetX = 0;
    startOffsetY = 0;
  }
  useEffect(()=>{
    ref.current!.draggable = true;
    ref.current!.addEventListener("dragstart",handleDragStart);
    ref.current!.addEventListener("drag",handleDrag);
    ref.current!.addEventListener("dragend",handleDragEnd);
    return(()=>{
      ref.current!.draggable = false;
      ref.current!.removeEventListener("dragstart",handleDragStart);
      ref.current!.removeEventListener("drag",handleDrag);
      ref.current!.removeEventListener("dragend",handleDragEnd);
    })
  },[])
  return [ref,String(isDragging),x,y]
}