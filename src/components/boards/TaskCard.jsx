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
      className="Taskcard card"
    >
      <p className="font-bold">{task?.title}</p>
      <p className="Taskcard__subtasks-txt">
        {completedSubtasks?.length} of {subtasks?.length} subtasks
      </p>   
    </article>
  );
};

export default TaskCard;
