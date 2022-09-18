import useWidth from "../hooks/useWidth"
import useMouse from "../hooks/useMouse"

function App() {
  const width = useWidth();
  const [x,y] = useMouse();
  return (
    <div className="App">
      <div>{width}</div>
      <div>x:{x},y:{y}</div>
    </div>
  )
}

export default App
