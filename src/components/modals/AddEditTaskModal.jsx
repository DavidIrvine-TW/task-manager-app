import {useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";

const AddEditTaskModal = ({setNewTaskMenu, type}) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subTasks, setSubTasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
  ]);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns



  return (
    <section
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-30 z-10 flex items-center justify-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setNewTaskMenu(false);
      }}
    >


      <form className="absolute top-[6rem] w-[345px] rounded bg-white shadow-md p-6">

          <h2 className=" text-l mb-[1.5rem]">
              {type === "edit" ? "Edit" : "Add New"} Task
          </h2>

          <div className="flex flex-col">
            <label className="mb-[.5rem] text-body-l font-bold">
              Title
            </label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              id="task-title"
              type="text"
              className="border text-body-l p-2"
              placeholder=" e.g take a 2 min break"
            />
          </div>


          <div className="flex flex-col mt-[1.5rem]">
            <label className="text-body-l mb-[.5rem] font-bold">
              Description
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              id="task-description"
              className=" border p-2 min-h-[112px] text-body-l"
              placeholder="e.g. It's always good to take a break. This 
              15 minute break will  recharge the batteries 
              a little."
            />
          </div>


          <div className="flex flex-col mt-[1.5rem]">
            <label className="text-body-l mb-[.5rem] font-bold">
              Subtasks
            </label>

            {subTasks.map((task, index) => (
              <div className="flex gap-[1rem] items-center w-full mb-[.75rem]" key={index}>
                <input
                  className="border w-full text-body-l p-2"
                  onChange={(e) => {
                    onChange(subTasks.id, e.target.value);
                  }}
                  type="text"
                  value={subTasks.title}
                  placeholder="eg. Remember to take a break"
                />
                <button
                  onClick={() => onDelete(subTasks.id)}
                  className="cursor-pointer"
                >
                  <DeleteForeverOutlinedIcon fontSize="medium" />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="border flex items-center justify-center py-2 rounded text-body-xl font-bold"
              onClick={() => {
                setSubTasks((state) => [
                  ...state,
                  { title: "", isCompleted: [], id: uuidv4() },
                ]);
              }}
            >
              <AddIcon sx={{fontSize: '.75rem'}}/>
              New SubTask
            </button>   

          </div>

          <div className="flex flex-col mt-[1.5rem]">  
            <label className="text-body-l mb-[.5rem] font-bold">
                Task Status
            </label>

            <select className='text-body-md border py-2 px-4'>
              {columns.map((column, index) => (
                <option key={index}>{column.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                // onSubmit(type);
                setNewTaskMenu(false);
                // type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className=" w-full items-center mt-[1.5rem] border py-2 rounded text-body-xl font-bold"
          >
           {type === "edit" ? "Save Edited Task" : "Create Task"}
          </button>
     
      </form>





    </section>
  )
}

export default AddEditTaskModal