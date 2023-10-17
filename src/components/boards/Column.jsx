import React from 'react'
import TaskCard from './TaskCard'



const Column = ({colIndex, column}) => {





  return (
    <article className='min-w-[280px] border-2 border-dashed h-full mr-[1.5rem] rounded'>

      <p className="flex items-center gap-[.5rem] ">
        <div className="" />
        {column.name} ({column.tasks.length})
      </p>

  


    </article>
  )
}

export default Column