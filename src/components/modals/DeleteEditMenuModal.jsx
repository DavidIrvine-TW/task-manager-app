

const DeleteEditMenuModal = ({ setElippsesMenu, setCreateBoardMenu, setBoardMode, setDeleteBoardModal }) => {
  return (
    <article
      className="absolute top-[5rem] right-0 p-4 flex flex-col gap-[1rem] items-start border rounded"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setElippsesMenu(false);
      }}
    >
      <button
        onClick={() => {
          setElippsesMenu(false)
          setCreateBoardMenu(true)
          setBoardMode('edit')
        }}
        className=" font-bold w-[150px] py-1 px-2 text-left"
        >
          Edit Board
      </button>

      <button 
        onClick={() => {
          setElippsesMenu(false)
          setDeleteBoardModal(true)
        }}
        className="text-red-500 font-bold w-[150px] py-1 px-2 text-left"
        >
          Delete Board    
      </button>

    </article>
  );
};

export default DeleteEditMenuModal;
