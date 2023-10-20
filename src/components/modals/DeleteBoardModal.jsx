import React from "react";
import boardsSlice from "../../redux/boardsSlice";
import { useDispatch } from "react-redux";

const DeleteBoardModal = ({
  setDeleteBoardModal,
  boardName,
  deleteMode,
  taskIndex,
  columnIndex,
}) => {
  const dispatch = useDispatch();

  const deleteBoardHandler = (e) => {
    if (deleteMode === "board") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setDeleteBoardModal(false);
    } else {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex, columnIndex }));
      setDeleteBoardModal(false);
    }
  };

  return (
    <section
      id="delete-board-modal"
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-30 dark:bg-darkbackground dark:bg-opacity-80 z-20  flex items-center justify-center shadow-md"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setDeleteBoardModal(false);
      }}
    >
      <article className=" w-[345px] tb:w-[480px] rounded bg-white dark:bg-drkbackground-950 shadow-md p-6">
        {/* <p className="mb-[.5rem] font-bold text-l ">
          {deleteMode === "board"
            ? `Board`
            : `Task`}
        </p> */}
        <p className="mb-[1.5rem] text-lghtprimary font-bold text-l ">
          {deleteMode === "board"
            ?  `${boardName}?`
            : ` ${deleteMode.taskTitle}?`}
        </p>

        <p className="mb-[1.5rem] text-body-l dark:text-gray-500">
          {deleteMode === "board"
            ? `Are you sure you want to delete the ‘${boardName}’ board? This action will remove all columns and tasks and cannot be reversed.`
            : `Are you sure you want to delete the ‘${deleteMode.taskTitle}’ task and its subtasks? This action cannot be reversed.`}
        </p>

        <div className="flex flex-col  w-full gap-[1rem]">
          <button
            onClick={deleteBoardHandler}
            className="border py-2 rounded bg-lghtprimary hover:bg-primary-400 text-darktext font-bold shadow-md dark:border-darksecondary"
          >
            {deleteMode === "board" ? 'Delete Board' : 'Delete Task'}   
          </button>

          <button
            onClick={() => setDeleteBoardModal(false)}
            className="py-2 rounded hover:underline dark:text-darktext"
          >
            Cancel
          </button>
        </div>
      </article>
    </section>
  );
};

export default DeleteBoardModal;
