import React from 'react'
import { useDispatch } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

const Subtask = ({subtaskIndex, task}) => {

    const dispatch = useDispatch();
    
    // const subtask = task.subtasks.find((subtask, i) => i === subtaskIndex);

    const checked = task.isCompleted;

    const onChange = (id) => {
      dispatch(
        boardsSlice.actions.setSubtaskCompleted({ subtaskId: id})
      );
    };


  return (
    <div className="Subtask">
      <input
        className=" w-4 h-4 cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={onChange(task.subtask_id)}
      />
      <p 
      className={checked ? " line-through opacity-30 text-body-md " : "text-body-md"}
      >
      {task.title}
      </p>
    </div>
  )
}

export default Subtask