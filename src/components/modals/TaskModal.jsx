import React, { useState } from "react";
import { useSelector } from "react-redux";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import DeleteEditTaskModal from "./DeleteEditTaskModal";
import Subtask from "../boards/Subtask";

const TaskModal = ({ setTaskModalOpen, columnIndex, taskIndex }) => {
  const [ellipsesMenu, setElippsesMenu] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const column = columns.find((column, index) => index === columnIndex);
  const task = column.tasks.find((task, index) => index === taskIndex);
  const subtasks = task.subtasks;

  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <section
      className="fade-in fixed top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-50 z-10 flex items-center justify-center cursor-default"
      // onClick={closeModalAndSave}
    >
      <article className="bg-lghtbackground shadow-md p-[2rem] rounded tb:w-[480px]">
        <div className="relative flex justify-between items-center">
          <h1>{task.title}</h1>
          <button onClick={() => setElippsesMenu(!ellipsesMenu)}>
            <MoreVertTwoToneIcon
              sx={{ fontSize: "2rem" }}
              className="text-lghttext"
            />
          </button>
          {ellipsesMenu ? <DeleteEditTaskModal /> : ""}
        </div>

        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description ? task.description : "No description"}
        </p>

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completedSubtasks.length} of {subtasks.length})
        </p>



        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                subtaskIndex={index}
                taskIndex={taskIndex}
                columnIndex={columnIndex}
                key={index}
              />
            );
          })}
        </div>


        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            // value={status}
            // onChange={onChange}
          >
            {columns.map((column, index) => (
              <option className="status-options" key={index}>
                {column.name}
              </option>
            ))}
          </select>
        </div>

      </article>
    </section>
  );
};

export default TaskModal;
