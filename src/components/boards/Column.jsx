import React, {useState, useEffect} from "react";
import TaskCard from "./TaskCard";

const Column = ({
  columnIndex,
  column,
  setTaskModalOpen,
  setTaskColumnIndex,
  setTaskTaskIndex,
}) => {


const colors = [
  "bg-purple-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-sky-400",
  "bg-red-400",
];
const [randomColor, setRandomColor] = useState("");
console.log(randomColor)
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

useEffect(() => {
  const color = getRandomColor();
  setRandomColor(color);
}, []);



  return (
    <article
      className={`${
        column.tasks.length === 0 ? "border-dashed border-2 " : ""
      } w-[280px] mr-[1.5rem] rounded flex flex-col gap-[1rem] p-[.5rem]`}
    >
      <div className="flex gap-[1rem]"> 
        <div 
          className={`rounded-full w-[1rem] h-[1rem] ${randomColor}`} />
        <p className="flex items-center gap-[.5rem] ">
          {column.name} ({column.tasks.length})
        </p>
      </div>

      {column.tasks.map((task, index) => (
        <TaskCard
          key={index}
          taskIndex={index}
          columnIndex={columnIndex}
          setTaskColumnIndex={setTaskColumnIndex}
          setTaskModalOpen={setTaskModalOpen}
          setTaskTaskIndex={setTaskTaskIndex}
        />
      ))}
    </article>
  );
};

export default Column;
