import React from 'react'

const AddEditTaskModal = ({setNewTaskMenu, type}) => {
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

        <h3 className=" text-l ">
            {type === "edit" ? "Edit" : "Add New"} Task
        </h3>



        
    </article>





    </section>
  )
}

export default AddEditTaskModal