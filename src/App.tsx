import useWidth from "../hooks/useWidth";
import useMouse from "../hooks/useMouse";
import useMouseInElement from "../hooks/useMouseInElement";
import useDrag from "../hooks/useDrag";
import useScroll from '../hooks/useScroll';
import { useRef } from "react";
import "./index.css";

function App() {
  const width = useWidth();
  const [x, y] = useMouse();
  const boxRef = useRef<HTMLDivElement>(null);
  const isInBox = String(useMouseInElement(boxRef.current!));
  const [dragRef, isDragging,dragX,dragY] = useDrag();
  const [scrollX,scrollY] = useScroll();
  return (
    <div className="App">
      <div ref={boxRef} className="box">
        <div>{width}</div>
        <div>
          x:{x},y:{y}
        </div>
        isInBox:{isInBox}
      </div>
      <div ref={dragRef} className="dragbox" style={{ position: "fixed" }}>
        <div>{String(isDragging)}</div>
        <div>dragX:{dragX},dragY:{dragY}</div>
        <div>
          window-scroll:
          <br/>
          x:{scrollX},y:{scrollY}
        </div>
      </div>
    </div>
  );
}

export default App;

