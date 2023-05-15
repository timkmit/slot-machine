import React, { useState } from "react";
import "./App.css";

const items = [
  "7️⃣",
  "❌",
  "🍓",
  "🍋",
  "🍉",
  "🍒",
  "💵",
  "🍊",
  "🍎"
];

function App() {
  const [result, setResult] = useState("");
  const [doors, setDoors] = useState([
    { spinned: false, boxes: ["❓"] },
    { spinned: false, boxes: ["❓"] },
    { spinned: false, boxes: ["❓"] }
  ]);

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  function spin() {
    reset();
    // Показать случайные элементы в течение 2 секунд
    const boxes2 = document.querySelectorAll(".box");
    const timeout = 2000; // время задержки в миллисекундах
    let t = 0; // текущее время
    const interval = 100; // интервал обновления в миллисекундах
  
    const randomizeBoxes = () => {
      if (t >= timeout) {
        const newDoors = doors.map((door) => {
          const pool = [];
          const groups = 1;
          for (let n = 0; n < groups; n++) {
            pool.push(...items);
          }
  
          const shuffled = shuffle(pool);
  
          return {
            spinned: true,
            boxes: shuffled.slice(0, door.boxes.length),
          };
        });
  
        setDoors(newDoors);
  
        const boxes = document.querySelectorAll(".box");
        let combination = "";
        newDoors.forEach((door) => {
          combination += door.boxes[0];
        });
        if (combination === "❌❌❌") {
          setResult("Вы выиграли! Комбинация: ❌❌❌");
        } else if (
          combination === "🍓🍓🍓" ||
          combination === "🍋🍋🍋" ||
          combination === "🍉🍉🍉" ||
          combination === "🍒🍒🍒" ||
          combination === "💵💵💵" ||
          combination === "🍊🍊🍊" ||
          combination === "🍎🍎🍎"
        ) {
          setResult(`Вы выиграли! Комбинация: ${combination}`);
        } else {
          setResult("В следующий раз повезет!");
        }
  
        boxes.forEach((box) => {
          box.classList.add("rolling");
          box.addEventListener(
            "animationend",
            () => {
              setTimeout(() => {
                box.classList.remove("rolling");
                const index = parseInt(box.dataset.index);
                const value = newDoors[index].boxes[0];
                box.innerText = value;
              }, 50);
            },
            { once: true }
          );
        });
  
        return;
      }
  
      boxes2.forEach((box) => {
        const index = parseInt(box.dataset.index);
        const randomValue = items[Math.floor(Math.random() * items.length)];
        box.innerText = randomValue;
      });
      t += interval;
      setTimeout(randomizeBoxes, interval);
    };
  
    randomizeBoxes();
  }
  
  
  

  function reset() {
    const newDoors = doors.map((door) => ({
      spinned: false,
      boxes: ["❓"],
    }));
    setDoors(newDoors);
    setResult("");
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => (box.innerText = "❓"));
}

return (
<div className="App">
<header className="App-header">
<h1>Слот-машина</h1>
<p>
Нажмите кнопку "Крутить", чтобы запустить машину.
</p>
<button onClick={spin}>Крутить</button>


<div className="doors2">
{doors.map((door, index) => (
<div key={index} className="door2">
{door.boxes.map((box, index) => (
<div key={index} className="box" data-index={index}>
{box}
</div>
))}
</div>
))}
</div>
<p>{result}</p>
</header>
</div>
);
}

export default App;
