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