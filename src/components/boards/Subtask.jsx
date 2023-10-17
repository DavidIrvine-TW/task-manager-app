import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Subtask = ({subtaskIndex, columnIndex, taskIndex}) => {

    // const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const column = board.columns.find((col, i) => i === columnIndex);
    const task = column.tasks.find((task, i) => i === taskIndex);
    const subtask = task.subtasks.find((subtask, i) => i === subtaskIndex);
    const checked = subtask.isCompleted;


  return (
    <div className=" w-full flex rounded relative items-center justify-start p-2 gap-[1rem] bg-lghtsecondary">
      <input
        className=" w-4 h-4 cursor-pointer "
        type="checkbox"
        checked={checked}
        // onChange={onChange}
      />
      <p className={checked ? " line-through opacity-30 text-body-md" : "text-body-md"}>
      {subtask.title}
      </p>
    </div>
  )
}

export default Subtask