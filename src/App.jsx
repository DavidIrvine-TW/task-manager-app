import {useState} from 'react'
import Nav from './components/navbar/Nav'
import BoardsMenuModal from './components/modals/BoardsMenuModal';
import AddEditBoardModal from './components/modals/AddEditBoardModal';
import AddEditTaskModal from './components/modals/AddEditTaskModal';


function App() {
  const [boardMenu, setBoardMenu] = useState(false);
  const [createBoardMenu, setCreateBoardMenu] = useState(false)
  const [newTaskMenu, setNewTaskMenu] = useState(false)

  return (
    <div id="wrapper" className="relative max-w-[1440px] mx-auto font-roboto h-screen">

      {/* Header */}

      <Nav boardMenu={boardMenu} setBoardMenu={setBoardMenu} setNewTaskMenu={setNewTaskMenu}/>

      {/* modals */}

      {boardMenu ? (<BoardsMenuModal setBoardMenu={setBoardMenu} setCreateBoardMenu={setCreateBoardMenu}/>) : ('')}
      {createBoardMenu ? (<AddEditBoardModal setCreateBoardMenu={setCreateBoardMenu}/>) : ('')}
      {newTaskMenu ? (<AddEditTaskModal setNewTaskMenu={setNewTaskMenu}/>) : ('')}





      {/* Main content*/}
      <main>

      </main>





      
    </div>
  )
}

export default App
