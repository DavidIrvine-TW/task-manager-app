

const DeleteEditMenuModal = ({ setElippsesMenu, setCreateBoardMenu, setBoardMode, setDeleteBoardModal, setDeleteMode }) => {



  return (
    <article
      id="dropdown-delete-edit-menu"
      className="absolute top-[5rem] right-[1rem] p-4 flex flex-col gap-[1rem] items-start border rounded bg-lghtbackground  dark:bg-drkbackground-950 dark:border-darksecondary shadow-md"
    >
    
      <div className="flex flex-col gap-[1rem]">

          <button
            onClick={() => {
              setElippsesMenu(false)
              setCreateBoardMenu(true)
              setBoardMode('edit')
            }}
            className=" font-bold w-[150px] py-1 px-2 text-left hover:underline dark:text-darktext"
            >
              Edit Board
          </button>

          <button 
            onClick={() => {
              setElippsesMenu(false)
              setDeleteBoardModal(true)
              setDeleteMode("board")
            }}
            className="text-lghtprimary font-bold w-[150px] py-1 px-2 text-left hover:underline"
            >
              Delete Board    
          </button>

      </div>

    </article>
  );
};

export default DeleteEditMenuModal;
