import React from "react";
import TaskCard from "./TaskCard";

const Column = ({ columnIndex, column }) => {
  return (
    <article className="w-[280px] mr-[1.5rem] rounded flex flex-col gap-[1rem]">
   
        <p className="flex items-center gap-[.5rem] ">
          <div className="" />
          {column.name} ({column.tasks.length})
        </p>

        {column.tasks.map((task, index) => (
          <TaskCard key={index} taskIndex={index} columnIndex={columnIndex} />
        ))}
     
    </article>
  );
};

export default Column;
