import React from "react";

const DeleteBoardModal = ({ setDeleteBoardModal }) => {

  const boardName = "blahblah";

  return (
    <section
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-30 z-10 flex items-center justify-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setDeleteBoardModal(false);
      }}
    >
      <article className="absolute top-[6rem] w-[345px] rounded bg-white shadow-md p-6">
        
        <p className="mb-[1.5rem] text-red-500 font-bold text-l ">
          Delete this board?
        </p>

        <p className="mb-[1.5rem] text-body-l">
          {`Are you sure you want to delete the ‘${boardName}’ board? This
            action will remove all columns and tasks and cannot be reversed.`}
        </p>

        <div className="flex flex-col w-full gap-[1rem]">
          <button 
            onClick={() => {}}
            className="border bg-red-500 text-white py-2 rounded">
            Delete
          </button>

          <button
            onClick={() => setDeleteBoardModal(false)}
            className="py-2 rounded"
          >
            Cancel
          </button>
        </div>


      </article>
    </section>
  );
};

export default DeleteBoardModal;
