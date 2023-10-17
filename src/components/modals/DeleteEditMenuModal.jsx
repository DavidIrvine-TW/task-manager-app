

const DeleteEditMenuModal = ({ setElippsesMenu, setCreateBoardMenu, setBoardMode, setDeleteBoardModal }) => {



  return (
    <article
      className="absolute top-[5rem] right-[1rem] p-4 flex flex-col gap-[1rem] items-start border rounded bg-lghtbackground z-500 shadow-md"
      // onClick={(e) => {
      //   if (e.target !== e.currentTarget) {
      //     return
      //   }
      //   setElippsesMenu(false);
      // }}
    >
      {/* <div>
        <button className=" font-bold w-[150px] py-1 px-2 text-left">
          Sign in
        </button>

        

      </div> */}


      <div className="flex flex-col gap-[1rem]">
          <button
            onClick={() => {
              setElippsesMenu(false)
              setCreateBoardMenu(true)
              setBoardMode('edit')
            }}
            className=" font-bold w-[150px] py-1 px-2 text-left hover:underline"
            >
              Edit Board
          </button>

          <button 
            onClick={() => {
              setElippsesMenu(false)
              setDeleteBoardModal(true)
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
