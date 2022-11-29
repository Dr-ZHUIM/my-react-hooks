import { useState, useEffect } from "react";

export default function useLimitMove() {
  const [isMove, setIsMove] = useState(false);
  function handleMove(e: TouchEvent) {
    setIsMove(true);
    e.preventDefault();
  }
  function handleMoveEnd(e: TouchEvent) {
    setIsMove(false);
  }
  useEffect(() => {
    document.documentElement.addEventListener("touchmove", handleMove);
    document.documentElement.addEventListener("touchend", handleMoveEnd);
    return () => {
      document.documentElement.removeEventListener("touchmove", handleMove);
      document.documentElement.removeEventListener("touchend", handleMoveEnd);
    };
  });
  return isMove;
}
