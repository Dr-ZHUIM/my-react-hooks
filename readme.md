# My-React-Hooks
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [My-React-Hooks](#my-react-hooks)
  - [Why Hooks?](#why-hooks)
- [Hooks introduction](#hooks-introduction)
  - [useWidth](#usewidth)
  - [useMouse](#usemouse)
  - [useMouseInElement](#usemouseinelement)
  - [useDrag](#usedrag)
  - [useScroll](#usescroll)

<!-- /code_chunk_output -->
## Why Hooks?

- Huge components that are hard to refactor and test.
- Duplicated logic between different components and lifecycle methods.
- Complex patterns like render props and higher-order components.

# Hooks introduction

## useWidth 

The most famous Custom Hook which was used by React group can be a good example for us to learn custom Hooks.

This Hook can listen your window resize and return your window-width as a numer

the origin code :

```
import { useState,useEffect } from "react";

export default function useWidth(){
    const [width,setWidth] = useState(window.innerWidth);
    useEffect(()=>{
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize',handleResize);
        return (()=>{
            window.removeEventListener('resize',handleResize)
        })
    },[]);
    return width;
}
```

how to use :

```
import useMouse from "../hooks/useMouse"
const width = useWidth();
```

## useMouse

This Hook can listen your mouse-position at your window and return a array with two elements as `[x,y]`

the origin code :

```
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
```

how to use :

```
import useMouse from "../hooks/useMouse"

  <!-- in your component -->
  const [x,y] = useMouse()
```

## useMouseInElement

This Hook can return a boolean which show your mouse is or is not inside your selected element.

**You should pass a DOM node to this hook, if you use `useRef`, you shold pass its `current`**

the origin code :
```
import React, { useState, useEffect } from "react";

export default function useMouseInElement(Node: HTMLElement) {
  const [isInElement, setIsInElement] = useState(false);
  useEffect(() => {
    const handleMouseEnter = () => {
      setIsInElement(true);
    };
    const handleMouseLeave = () => {
      setIsInElement(false);
    };
      Node && Node.addEventListener("mouseenter", handleMouseEnter);
      Node && Node.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      Node && Node.removeEventListener("mouseenter", handleMouseEnter);
      Node && Node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [Node]);
  return isInElement;
}
```

How to use :
```
import { useRef } from "react";
import useMouseInElement from "../hooks/useMouseInElement";

  <!-- in your component -->

  const boxRef = useRef<HTMLDivElement>(null);
  const isInBox = useMouseInElement(boxRef.current!);
```

## useDrag

This Hook can return a `Array` with a `ref`, a `boolean` state showing your dragState and two position states `x` `y`. Binding the `ref` to your element, then you can drag your element to move.

the origin code :
```
import {useState,useEffect,useRef} from "react";

export default function useDrag():[React.RefObject<any>,boolean,number,number]{
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
  return [ref,isDragging,x,y]
}
```

How to use : 

```
import useDrag from "../hooks/useDrag";


  <!-- in your component -->
  const [dragRef, isDragging,dragX,dragY] = useDrag();

```

## useScroll

This Hook can listen your element is scrolling and return its scroll-distance. By default, it will bind the `window` if you didn't pass a DOM node to this hook.

> I think i should refactor this hook and abstract another hook `useWindowScroll` to ensure  accuracy

the origin code
```
import { useState, useEffect } from "react";

export default function useScroll(Node: HTMLElement | Window = window) {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = (e: Event) => {
    if (Node instanceof Window) {
      setScrollX(Node.scrollX)
      setScrollY(Node.scrollY);
      return
    }
    setScrollX(Node.scrollLeft)
    setScrollY(Node.scrollTop);
  }
  useEffect(() => {
    Node.addEventListener("scroll", handleScroll);
    return (() => {
      Node.removeEventListener("scroll", handleScroll);
    })
  }, []);
  return [scrollX,scrollY]
}
```

How to use 

```
import useScroll from '../hooks/useScroll';

  <!-- in your component -->
  const [scrollX,scrollY] = useScroll();
```