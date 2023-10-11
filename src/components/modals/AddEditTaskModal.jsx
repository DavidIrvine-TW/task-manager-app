

const AddEditTaskModal = ({setNewTaskMenu, type}) => {

  const [boardTitle, setBoardTitle] = useState('')
  const [boardDescription, setBoardDescription] = useState('')





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


      <article className="absolute top-[6rem] w-[345px] rounded bg-white shadow-md p-6">

          <h2 className=" text-l mb-[1.5rem]">
              {type === "edit" ? "Edit" : "Add New"} Task
          </h2>

          <div className="flex flex-col">
            <label className="mb-[.5rem] text-body-l font-bold">
              Title
            </label>
            <input
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
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
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              id="task-description"
              className=" border p-2 min-h-[112px] text-body-l"
              placeholder="e.g. It's always good to take a break. This 
              15 minute break will  recharge the batteries 
              a little."
            />
          </div>


          <div className="flex flex-col mt-[1.5rem]">
            <label className="text-body-l mb-[.5rem] font-bold">
              SubTasks
            </label>
            
          </div>



        
      </article>





    </section>
  )
}

export default AddEditTaskModal