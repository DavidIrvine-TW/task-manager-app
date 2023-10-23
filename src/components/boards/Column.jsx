import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
        column.tasks.length === 0
          ? "border-dashed border-2 dark:border-darksecondary "
          : ""
      } w-[296px] mr-[1.5rem] rounded flex flex-col gap-[1rem] p-[.5rem] `}
    >
      <div className="flex gap-[1rem] items-center">
        <div className={`rounded-full w-[1rem] h-[1rem] ${randomColor}`} />
        <p className="flex items-center gap-[.5rem] dark:text-darktext uppercase tracking-[2px]">
          {column.name} ({column.tasks.length})
        </p>
      </div>
      <Droppable droppableId={columnIndex.toString()}>
        {(droppableProvided) => (
          <div
            className="w-full h-full flex flex-col gap-[1rem]"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            <span style={{ display: "none" }}>
              {droppableProvided.placeholder}
            </span>

            {column.tasks.map((task, index) => (
              <Draggable
                key={index}
                draggableId={task.id.toString()}
                index={index}
              >
                {(draggableProvided) => (
                  <TaskCard
                    key={index}
                    taskIndex={index}
                    columnIndex={columnIndex}
                    setTaskColumnIndex={setTaskColumnIndex}
                    setTaskModalOpen={setTaskModalOpen}
                    setTaskTaskIndex={setTaskTaskIndex}
                    provided={draggableProvided}
                  />
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </article>
  );
};

export default Column;
