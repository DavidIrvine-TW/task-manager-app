import AddBoardModal from './AddBoardModal'
import AddEditTaskModal from './AddEditTaskModal'
import BoardsMenuModal from './BoardsMenuModal'
import DeleteBoardModal from './DeleteBoardModal'
import DeleteEditMenuModal from './DeleteEditMenuModal'
import DeleteEditTaskModal from './DeleteEditTaskModal'
import TaskModal from './TaskModal'
import { useSelector } from "react-redux";

const AllModals = () => {

const grabModal = useSelector((state) => state.modal)

  
  return (
    <>
      
      
      {grabModal.type === 'createBoard' && <AddBoardModal  type="add"/>}
      {grabModal.type === 'editBoard' && <AddBoardModal  type="edit"/>}
      {grabModal.type === 'addNew' && <AddEditTaskModal  type="add"/>}
      {grabModal.type === 'mobileMenu' && <BoardsMenuModal  />}
      {grabModal.type === 'deleteBoard' && <DeleteBoardModal  type="board"/>}
      {grabModal.type === 'deleteTask' && <DeleteBoardModal  type="task"/>}
      {grabModal.type === 'deleteEditMenu' && <DeleteEditMenuModal  />}
      {/* {grabModal.type === 'createBoard' && <DeleteEditTaskModal  />} */}
      {grabModal.type === 'task' && <TaskModal  />}
     
      
      
    </>
  )
}

export default AllModals