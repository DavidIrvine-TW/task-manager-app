import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";

const AddEditTaskModal = ({
  setNewTaskMenu,
  type,
  taskIndex,
  defaultStatusIndex = 0,
}) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [taskTitleError, setTaskTitleError] = useState("");
  const [subtaskError, setSubtaskError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  ); 
  const columns = board.columns;
  const col = columns.find((col, index) => index === defaultStatusIndex);
  const [status, setStatus] = useState(columns[defaultStatusIndex].name);
  const [statusIndex, setStatusIndex] = useState(defaultStatusIndex);
  
  const subTaskHandler = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = prevState.map((subtask) => {
        if (subtask.id === id) {
          return { ...subtask, title: newValue };
        }
        return subtask;
      });
      return newState;
    });
  };

  const taskDeleteHandler = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
    setStatusIndex(e.target.selectedIndex);
  };

  const formValidate = async () => {
    setSubtaskError("");
    setTaskTitleError("");
    setDescriptionError("");
    setIsValid(true);

    if (!taskTitle.trim()) {
      setTaskTitleError("Enter a task title");
      setIsValid(false);
      return false;
    }

    if (!taskDescription.trim()) {
      setDescriptionError("Enter a short description");
      setIsValid(false);
      return false;
    }

    const subTaskValidationPromises = subtasks.map(async (subtask) => {
      if (!subtask.title.trim()) {
        setSubtaskError("Enter a subtask title");
        setIsValid(false);
        return false;
      }
    });

    const subTaskValidationResults = await Promise.all(
      subTaskValidationPromises
    );

    if (subTaskValidationResults.includes(false)) {
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = await formValidate();
    if (isFormValid) {
      if (type === "add") {
        dispatch(
          boardsSlice.actions.addTask({
            taskTitle,
            status,
            taskDescription,
            subtasks,
            statusIndex,
          })
        );
      } else if (type === "edit") {
        dispatch(boardsSlice.actions.editTask({ boardName, createdColumns }));
      }
      setNewTaskMenu(false);
    }
  };

  const subtaskStyle = subtasks.length === 0 ? 'hidden' : '';

  return (
    <section
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-50 z-10 flex items-center justify-center"
      // click outside to close modal
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setNewTaskMenu(false);
      }}
    >
      <form
        onSubmit={onSubmit}
        className="w-[345px] tb:w-[480px] rounded bg-lghtbackground shadow-md p-6"
      >
        <h2 className=" text-l mb-[1.5rem]">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h2>

        {/* task title */}
        <div className="flex flex-col">
          <label className="mb-[.5rem] text-body-l font-bold">Title*</label>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            id="task-title"
            type="text"
            className="border text-body-l p-2"
            placeholder="the task needs a name"
            
          />
          <span className="text-red-500 text-body-md mt-[4px]">
            {taskTitleError}
          </span>
        </div>

        {/* task description */}
        <div className="flex flex-col mt-[1.5rem]">
          <label className="text-body-l mb-[.5rem] font-bold">
            Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            id="task-description"
            className=" border p-2 max-h-[100px] text-body-l"
            placeholder="enter a brief description of the task"
          />
          <span className="text-red-500 text-body-md mt-[4px]">
            {descriptionError}
          </span>
        </div>

          {/* subtasks */}
        <div className="flex flex-col mt-[1.5rem]">
          <div>
            <label className={`${subtaskStyle} text-body-l mb-[.5rem] font-bold`}>Subtasks*</label>

            {subtasks.map((subtask, index) => (
              <div
                className="flex gap-[1rem] items-center w-full mb-[.75rem]"
                key={subtask.id}
              >
                <input
                  className="border w-full text-body-l p-2"
                  onChange={(e) => {
                    subTaskHandler(subtask.id, e.target.value);
                  }}
                  type="text"
                  value={subtask.title}
                  placeholder="name your subtask"
                />
                <button
                  onClick={() => taskDeleteHandler(subtask.id)}
                  className="cursor-pointer"
                >
                  <DeleteForeverOutlinedIcon fontSize="medium" />
                </button>
              </div>
            ))}
            <span className="text-red-500 text-body-md ">{subtaskError}</span>
          </div>

          <button
            type="button"
            className="border flex items-center justify-center py-2 rounded text-body-xl font-bold  bg-lghtsecondary hover:bg-secondary-50"
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            <AddIcon sx={{ fontSize: ".75rem" }} />
            SubTask
          </button>
        </div>

        {/* task status  */}
        <div className="flex flex-col mt-[1.5rem]">
          <label className="text-body-l mb-[.5rem] font-bold">
            Task Status
          </label>

          <select
            onChange={statusHandler}
            value={status}
            className="text-body-md border py-2 px-4"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
        </div>

        {/* form submit */}
        <button
          onClick={() => {
            onSubmit(e);
            // setNewTaskMenu(false);
            // type === "edit" && setIsTaskModalOpen(false);
          }}
          className=" w-full items-center mt-[1.5rem] border py-2 rounded text-body-xl bg-lghtaccent hover:bg-accent-300 text-lghttext font-bold shadow-md"
        >
          {type === "edit" ? "Save Edited Task" : "Create Task"}
        </button>
      </form>
    </section>
  );
};

export default AddEditTaskModal;
