# My-React-Hooks

## Why Hooks?

- Huge components that are hard to refactor and test.
- Duplicated logic between different components and lifecycle methods.
- Complex patterns like render props and higher-order components.

# Hooks introduction

## useWidth 

The most famous Custom Hook which was used by React group can be a good example for us to learn custom Hooks.

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