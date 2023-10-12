import { useState } from "react";
import Nav from "./components/navbar/Nav";
import BoardsMenuModal from "./components/modals/BoardsMenuModal";
import AddEditBoardModal from "./components/modals/AddEditBoardModal";
import AddEditTaskModal from "./components/modals/AddEditTaskModal";
import DeleteEditMenuModal from "./components/modals/DeleteEditMenuModal";
import DeleteBoardAndTaskModal from "./components/modals/DeleteBoardModal";

function App() {

  const [boardMenu, setBoardMenu] = useState(false);
  const [createBoardMenu, setCreateBoardMenu] = useState(false);
  const [type, setBoardMode] = useState(""); //add or edit
  const [taskType, setTaskMode] = useState("")//add or edit
  const [newTaskMenu, setNewTaskMenu] = useState(false);
  const [ellipsesMenu, setElippsesMenu] = useState(false);
  const [deleteBoardModal, setDeleteBoardModal] = useState(false);

  return (
    <div
      id="wrapper"
      className="relative max-w-[1440px] mx-auto font-roboto min-h-screen"
    >
      {/* Header */}

      <Nav
        boardMenu={boardMenu}
        setBoardMenu={setBoardMenu}
        setNewTaskMenu={setNewTaskMenu}
        ellipsesMenu={ellipsesMenu}
        setElippsesMenu={setElippsesMenu}
      />


      {/* MODALS */}
      {/* nav menu modal */}
      {boardMenu ? (
        <BoardsMenuModal
          setBoardMenu={setBoardMenu}
          setCreateBoardMenu={setCreateBoardMenu}
          setBoardMode={setBoardMode}
        />
      ) : (
        ""
      )}
      
      {/* add or edit board modal */}
      {createBoardMenu ? (
        <AddEditBoardModal
          setCreateBoardMenu={setCreateBoardMenu}
          type={type}
          setBoardMode={setBoardMode}
        />
      ) : (
        ""
      )}

      {/* add or edit task modal */}
      {newTaskMenu ? <AddEditTaskModal setNewTaskMenu={setNewTaskMenu} /> : ""}
      
      {/* edit or delete board modal */}
      {ellipsesMenu ? (
        <DeleteEditMenuModal
          setElippsesMenu={setElippsesMenu}
          setBoardMode={setBoardMode}
          setCreateBoardMenu={setCreateBoardMenu}
          setDeleteBoardModal={setDeleteBoardModal}
        />
      ) : (
        ""
      )}
      {/* edit or delete board modal */}
      {deleteBoardModal ? (<DeleteBoardAndTaskModal setDeleteBoardModal={setDeleteBoardModal}/>) : ("")}

      {/* Main content*/}

      <main>


        
      </main>
    </div>
  );
}

export default App;
