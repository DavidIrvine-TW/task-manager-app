import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";
import CloseIcon from '@mui/icons-material/Close';

const AddEditTaskModal = ({
  setNewTaskMenu,
  newTaskMenu,
  type,
  taskIndex,
  columnIndex = 0

}) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [taskTitleError, setTaskTitleError] = useState("");
  const [subtaskError, setSubtaskError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isValid, setIsValid] = useState(true);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  ); 

  const columns = board.columns;
  const column = columns.find((col, index) => index === columnIndex);
  const task = column ? column.tasks.find((task, index) => index === taskIndex) : []

  const [status, setStatus] = useState(columns[columnIndex].name);
  const [statusIndex, setStatusIndex] = useState(columnIndex);

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setIsFirstLoad(false);
  }
  
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
    setIsDisabled(false)
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

    // if (!taskDescription.trim()) {
    //   setDescriptionError("Enter a short description");
    //   setIsValid(false);
    //   return false;
    // }

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
        dispatch(
          boardsSlice.actions.editTask({ 
            taskTitle,
            status,
            taskDescription,
            subtasks,
            statusIndex,
            taskIndex, 
            columnIndex
          }));
      }
      setNewTaskMenu(false);
    }
  };

  const subtaskStyle = subtasks.length === 0 ? 'hidden' : '';

  return (
    <section
      id="add-edit-task-modal"
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-50 dark:bg-darkbackground dark:bg-opacity-80 z-20 flex items-center justify-center overflow-y-auto"
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
        className="w-[345px] tb:w-[480px] rounded bg-lghtbackground  dark:bg-drkbackground-950 shadow-md p-6 overflow-y-visible"
      >
       <div className='flex justify-between items-center mb-[1.5rem] dark:text-drksecondary-700'>
            <h2 className=" text-l ">
                {type === "edit" ? "Edit" : "Add New"} Task
            </h2>
              <button
                className='border rounded-full p-1  hover:scale-105'
                onClick={() => setNewTaskMenu(!newTaskMenu) }
              ><CloseIcon/></button>
          </div>

        {/* task title */}
        <div className="flex flex-col">
          <label className="mb-[.5rem] text-body-l font-bold dark:text-gray-500">Title*</label>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            id="task-title"
            type="text"
            className="border text-body-l p-2 rounded"
            placeholder="the task needs a name"
            
          />
          <span className="text-red-500 text-body-md mt-[4px]">
            {taskTitleError}
          </span>
        </div>

        {/* task description */}
        <div className="flex flex-col mt-[1.5rem]">
          <label className="text-body-l mb-[.5rem] font-bold dark:text-gray-500">
            Description (optional)
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            id="task-description"
            className=" border p-2 max-h-[100px] text-body-l rounded"
            placeholder="enter a brief description of the task"
          />
          <span className="text-red-500 text-body-md mt-[4px]">
            {descriptionError}
          </span>
        </div>

          {/* subtasks */}
        <div className="flex flex-col mt-[1.5rem]">
          <div>
            <label className={`${subtaskStyle} text-body-l mb-[.5rem] font-bold dark:text-gray-500`}>Subtasks*</label>

            {subtasks.map((subtask, index) => (
              <div
                className="flex gap-[1rem] items-center w-full mb-[.75rem]"
                key={subtask.id}
              >
                <input
                  className="border w-full text-body-l p-2 rounded"
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
                  <DeleteForeverOutlinedIcon fontSize="medium" className="hover:text-red-500 hover:scale-110"/>
                </button>
              </div>
            ))}
            <span className="text-red-500 text-body-md ">{subtaskError}</span>
            {isDisabled ? (<span className="text-red-500 text-body-md ">Max subtasks (6)</span>):('')}
          </div>

          <button
            type="button"
            disabled={isDisabled}
            className="border flex items-center justify-center py-2 rounded text-body-xl font-bold  bg-lghtsecondary hover:bg-secondary-50  dark:bg-drksecondary-300 hover:dark:bg-secondary-200 dark:border-darksecondary"
            onClick={() => { if(subtasks.length > 5){
              setIsDisabled(true)
              return
            }
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
              setIsDisabled(false)
            }}
          >
            <AddIcon sx={{ fontSize: ".75rem" }} />
            SubTask
          </button>
        </div>

        {/* task status  */}
        <div className="flex flex-col mt-[1.5rem]">
          <label className="text-body-l mb-[.5rem] font-bold dark:text-gray-500">
            Task Status
          </label>

          <select
            onChange={statusHandler}
            value={status}
            className="text-body-md border py-2 px-4 rounded "
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
          className=" w-full items-center mt-[1.5rem] border py-2 rounded text-body-xl bg-lghtaccent hover:bg-accent-300 text-lghttext dark:bg-drksecondary-800  hover:dark:bg-drksecondary-900 dark:border-darksecondary hover:dark:text-darktext font-bold shadow-md"
        >
          {type === "edit" ? "Update" : "Create Task"}
        </button>
      </form>
    </section>
  );
};

export default AddEditTaskModal;
