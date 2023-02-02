import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    setList((prev) => [...prev, newDot]);
    console.log(newDot);
    setUndid([])
    // console.log(event)
  };
  const handleOndo = (event) => {
    event.stopPropagation();
    console.log("undo");

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  };
  const handleRedo = (event) => {
    event.stopPropagation();
    console.log("Redo");

    if (undid.length === 0) {
      return;
    }

    const recoveredDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList((prev) => [...prev, recoveredDot]);
  };

  return (
    <div id="page" onClick={handleClick}>
      <button onClick={handleOndo}> desfazer</button>
      <button onClick={handleRedo}> Resfazer</button>

      {list.map((item, index) => (
        <span
        key={index}
          className="dot"
          style={{ left: item.clientX, top: item.clientY }}
        />
      ))}
    </div>
  );
}

export default App;
