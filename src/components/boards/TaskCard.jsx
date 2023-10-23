import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";

const TaskCard = ({ columnIndex, taskIndex , setTaskModalOpen, setTaskColumnIndex, setTaskTaskIndex, provided }) => {
  
  const boards = useSelector((state) => state.boards);
  const board = boards?.find((board) => board.isActive === true);
  const columns = board?.columns;
  const column = columns?.find((column, index) => index === columnIndex);
  const task = column.tasks?.find((task, index) => index === taskIndex);
  let subtasks = task?.subtasks;
  const completedSubtasks = subtasks?.filter((subtask) => subtask.isCompleted);

  const handleTaskCardClick = () => {
    setTaskModalOpen(true);
    setTaskColumnIndex(columnIndex)
    setTaskTaskIndex(taskIndex)  
  };

  return (
    <article
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={handleTaskCardClick}
      className="card fade-in flex flex-col cursor-pointer hover:cursor-grab border  px-[1rem] py-[1.5rem] rounded shadow-md w-[280px] hover:opacity-60 bg-lghtbackground dark:bg-drkbackground-950 dark:border-darksecondary dark:text-drksecondary-700"
    >
      <p className="font-bold">{task?.title}</p>
      <p className="font-bold text-xs mt-2 text-gray-500">
        {completedSubtasks?.length} of {subtasks?.length} subtasks
      </p>   
    </article>
  );
};

export default TaskCard;
