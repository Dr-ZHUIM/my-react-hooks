import useWidth from "../hooks/useWidth";
import useMouse from "../hooks/useMouse";
import useMouseInElement from "../hooks/useMouseInElement";
import useDrag from "../hooks/useDrag";
import useScroll from '../hooks/useScroll';
import useDark from '../hooks/useDark';
import useTime from '../hooks/useTime';
import { useRef } from "react";
import "./index.css";

function App() {
  const width = useWidth();
  const [x, y] = useMouse();
  const boxRef = useRef<HTMLDivElement>(null);
  const isInBox = String(useMouseInElement(boxRef.current!));
  const [dragRef, isDragging,dragX,dragY] = useDrag();
  const [scrollX,scrollY] = useScroll();
  const [isDark,setDark] = useDark(false);
  const time = useTime();
  return (
    <div className="App" color-mode={isDark}>
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
        <button onClick={setDark}>change Color-Mode</button>
        <div>time:{String(time)}</div>
      </div>
    </div>
  );
}

export default App;

