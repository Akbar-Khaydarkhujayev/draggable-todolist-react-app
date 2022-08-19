import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";
// import Draggable from "react-draggable";
// import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: v4(),
        item: item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPosition: {
          x: 100,
          y: 100,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      alert("Enter Something...");
      setItem("");
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePosition = (data, index) => {
    let cloneItems = [...items];
    cloneItems[index].defaultPosition = { x: data.x, y: data.y };
    setItems(cloneItems);
  };

  const keyPress = (e) => {
    if (e.which === 13) {
      newItem();
    }
  };
  return (
    <div className="App">
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter Task"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button className="enter" onClick={newItem}>
          ENTER
        </button>
      </div>

      {items.map((item, index) => {
        return (
          <Draggable
            key={index}
            defaultPosition={item.defaultPosition}
            onStop={(e, data) => {
              updatePosition(data, index);
            }}
          >
            <div className="todo-item" style={{ backgroundColor: item.color }}>
              {item.item}
              <button className="delete" onClick={() => handleDelete(item.id)}>
                X
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
