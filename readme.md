# My-React-Hooks

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
const [x,y] = useMouse()
```