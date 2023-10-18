

const DeleteEditMenuModal = ({ setElippsesMenu, setBoardMode, setDeleteBoardModal }) => {



    return (
      <article
        id="dropdown-delete-edit-task"
        className="absolute top-[2rem] right-[0rem] p-4 flex flex-col gap-[1rem] items-start border rounded z-50 bg-lghtbackground shadow-md"
        >
  
  
        <div className="flex flex-col gap-[1rem]">
            <button
              onClick={() => {
                setElippsesMenu(false)
                // setCreateBoardMenu(true)
                // setBoardMode('edit')
              }}
              className=" font-bold w-[150px] py-1 px-2 text-left hover:underline"
              >
                Edit Task
            </button>
  
            <button 
              onClick={() => {
                setElippsesMenu(false)
                // setDeleteBoardModal(true)
              }}
              className="text-lghtprimary font-bold w-[150px] py-1 px-2 text-left hover:underline"
              >
                Delete Task  
            </button>
        </div>
  
      </article>
    );
  };
  
  export default DeleteEditMenuModal;
  