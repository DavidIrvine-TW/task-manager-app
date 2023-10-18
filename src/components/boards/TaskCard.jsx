import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";

const TaskCard = ({ columnIndex, taskIndex , setTaskModalOpen, setTaskColumnIndex, setTaskTaskIndex }) => {
  
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const column = columns.find((column, index) => index === columnIndex);
  const task = column.tasks.find((task, index) => index === taskIndex);
  let subtasks = task.subtasks;
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  const handleTaskCardClick = () => {
    setTaskModalOpen(true);
    setTaskColumnIndex(columnIndex)
    setTaskTaskIndex(taskIndex)  
  };

  return (
    <article
      onClick={handleTaskCardClick}
      className="flex flex-col cursor-pointer border  px-[1rem] py-[1.5rem] rounded shadow-md w-[280px]"
    >
      <p className="font-bold">{task.title}</p>
      <p className="font-bold text-xs mt-2">
        {completedSubtasks.length} of {subtasks.length} subtasks
      </p>   
    </article>
  );
};

export default TaskCard;
