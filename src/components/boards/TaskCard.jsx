import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import TaskModal from "../modals/TaskModal";

const TaskCard = ({ columnIndex, taskIndex }) => {

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const column = columns.find((column, index) => index === columnIndex);
  const task = column.tasks.find((task, index) => index === taskIndex);
  let subtasks = task.subtasks;
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <article
      onClick={() => setTaskModalOpen(true)}
      className="flex flex-col cursor-pointer border  px-[1rem] py-[1.5rem] rounded shadow-md"
    >
      <p className="font-bold">{task.title}</p>
      <p className="font-bold text-xs mt-2">
        {completedSubtasks.length} of {subtasks.length} subtasks
      </p>

      {taskModalOpen ? (
        <TaskModal
          columnIndex={columnIndex}
          taskIndex={taskIndex}
          setTaskModalOpen={setTaskModalOpen}
          taskModalOpen={taskModalOpen}
        />
      ) : (
        ""
      )}
    </article>
  );
};

export default TaskCard;
