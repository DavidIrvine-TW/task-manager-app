import { useState } from "react";
import Nav from "./components/navbar/Nav";
import BoardsMenuModal from "./components/modals/BoardsMenuModal";
import AddEditBoardModal from "./components/modals/AddEditBoardModal";
import AddEditTaskModal from "./components/modals/AddEditTaskModal";
import DeleteEditMenuModal from "./components/modals/DeleteEditMenuModal";
import DeleteBoardAndTaskModal from "./components/modals/DeleteBoardModal";
import { useSelector } from "react-redux";
import Sidebar from "./components/navbar/SideNav";
import EmptyBoard from "./components/emptyBoard/EmptyBoard";
import ScrollContainer from "react-indiana-drag-scroll";
import Column from "./components/boards/Column";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [boardMenu, setBoardMenu] = useState(false);
  const [createBoardMenu, setCreateBoardMenu] = useState(false);
  const [type, setBoardMode] = useState(""); //add or edit
  const [taskType, setTaskMode] = useState(""); //add or edit
  const [newTaskMenu, setNewTaskMenu] = useState(false);
  const [ellipsesMenu, setElippsesMenu] = useState(false);
  const [deleteBoardModal, setDeleteBoardModal] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(true);

  const boards = useSelector((state) => state.boards); //all boards
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  ); //currently active board
  const columns = board.columns;

  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      id="wrapper"
      className="relative max-w-[1920px] mx-auto font-roboto overflow-y-hidden "
    >
      {/* header menu */}
      <Nav
        boardMenu={boardMenu}
        setBoardMenu={setBoardMenu}
        setNewTaskMenu={setNewTaskMenu}
        ellipsesMenu={ellipsesMenu}
        setElippsesMenu={setElippsesMenu}
        setTaskMode={setTaskMode}
      />

      

      {/* Main content is inside scroll container*/}
      <ScrollContainer
        nativeMobileScroll={true}
        vertical={false}
        horizontal={true}
        hideScrollbars={false}
        ignoreElements={".card"}
        className="Main flex w-screen overflow-auto relative"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        {/* side menu */}
        <Sidebar
          setSideNavOpen={setSideNavOpen}
          sideNavOpen={sideNavOpen}
          setBoardMenu={setBoardMenu}
          setBoardMode={setBoardMode}
          setCreateBoardMenu={setCreateBoardMenu}
        />

        

        <main
          // style={{ height: "calc(100vh - 6rem)"}}
          className={`${
            sideNavOpen
              ? "dk:left-[18.75rem] tb:left-[16.25rem] transition-all duration-500 "
              : "left-[0]"
          } tb:absolute static transition-all duration-500 p-[1rem] dk:p-[1.5rem] cursor-move flex  w-full h-screen bg-lghtbackground`}
        >
          {boards.length < 1 ? (
            <EmptyBoard
              setCreateBoardMenu={setCreateBoardMenu}
              setBoardMenu={setBoardMenu}
              setBoardMode={setBoardMode}
            />
          ) : (
            ""
          )}

          {columns.length > 0 ? (
            <>
              {columns.map((column, index) => (
                <Column key={index} colIndex={index} column={column} />
              ))}
              <div className=" h-screen flex justify-center items-center font-bold  transition duration-300 cursor-pointer min-w-[280px] rounded border-dashed border-2 ">
                <button onClick={() => {}}>
                  <AddIcon fontSize="small" /> New Column
                </button>
              </div>
            </>
          ) : (
            ""
          )}

        </main>
      </ScrollContainer>






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
      {newTaskMenu ? (
        <AddEditTaskModal setNewTaskMenu={setNewTaskMenu} type={taskType} />
      ) : (
        ""
      )}

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
      {deleteBoardModal ? (
        <DeleteBoardAndTaskModal
          setDeleteBoardModal={setDeleteBoardModal}
          boardName={board.name}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
