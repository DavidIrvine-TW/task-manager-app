import React from "react";
import boardsSlice from "../../redux/boardsSlice";
import { useDispatch } from "react-redux";

const DeleteBoardModal = ({ setDeleteBoardModal, boardName }) => {

  const dispatch = useDispatch()

  const deleteBoardHandler = (e) => {
    if (e.target.textContent === "Delete Board") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 })); 
      setDeleteBoardModal(false) 
    } else {
        return;
    }
  };

  return (
    <section
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-30 z-10 flex items-center justify-center shadow-md"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setDeleteBoardModal(false);
      }}
    >
      <article className=" w-[345px] tb:w-[480px] rounded bg-white shadow-md p-6">
        
        <p className="mb-[1.5rem] text-lghtprimary font-bold text-l ">
        {`Delete ${boardName}?`}
        </p>

        <p className="mb-[1.5rem] text-body-l">
          {`Are you sure you want to delete the ‘${boardName}’ board? This
            action will remove all columns and tasks and cannot be reversed.`}
        </p>

        <div className="flex flex-col  w-full gap-[1rem]">
          <button 
            onClick={deleteBoardHandler}
            className="border py-2 rounded bg-lghtprimary hover:bg-primary-400 text-darktext font-bold shadow-md">
            Delete Board
          </button>

          <button
            onClick={() => setDeleteBoardModal(false)}
            className="py-2 rounded hover:underline"
          >
            Cancel
          </button>
        </div>

      </article>
    </section>
  );
};

export default DeleteBoardModal;
