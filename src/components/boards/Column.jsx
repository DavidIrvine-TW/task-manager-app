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
      className={`Column ${column.tasks.length === 0 ? "Column__empty": ""}`}
    >
      <div className="Column__cont-title">
        <div className={`Column__ball ${randomColor}`} />
        <p className="Column__title">
          {column.name} ({column.tasks.length})
        </p>
      </div>

      <Droppable droppableId={columnIndex.toString()}>
        {(droppableProvided) => (

          <div
            className="Column__cont-droppable"
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
