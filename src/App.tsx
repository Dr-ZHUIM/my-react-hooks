import useWidth from "../hooks/useWidth";
import useMouse from "../hooks/useMouse";
import useMouseInElement from "../hooks/useMouseInElement";
import { useRef } from "react";
import "./index.css"

function App() {
  const width = useWidth();
  const [x, y] = useMouse();
  const boxRef = useRef<HTMLDivElement>(null);
  const isInBox = useMouseInElement(boxRef.current!);
  return (
    <div className="App">
      <div ref={boxRef} className="box">
        <div>{width}</div>
        <div>
          x:{x},y:{y}
        </div>
        isInBox:{isInBox}
      </div>
    </div>
  );
}

export default App;
