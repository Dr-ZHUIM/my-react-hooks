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
  return String(isInElement);
}
