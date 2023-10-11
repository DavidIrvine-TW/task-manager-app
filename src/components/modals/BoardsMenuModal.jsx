import React from "react";
import { useSelector } from "react-redux";
import BoardIcon from "../icons/boardIcon";
import AddIcon from "@mui/icons-material/Add";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DrkMdSwitch from "../switch/DrkMdSwitch";
import useToggle from "../../hooks/useToggle";
import { useEffect } from "react";

const BoardsMenuModal = ({ setBoardMenu, setCreateBoardMenu, setBoardMode }) => {
  const [isDarkTheme, toggleMode] = useToggle(
    localStorage.getItem("theme-color") === "dark"
  );
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    document.documentElement.className = isDarkTheme ? "dark" : "";
    localStorage.setItem("theme-color", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <section
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-30 z-10 flex items-center justify-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardMenu(false);
      }}
    >
      <article className="absolute top-[6rem] w-[265px] rounded bg-white shadow-md py-4">
        <h2 className="tracking-[2.4px] text-sm mb-[1rem] px-4">
          ALL BOARDS: {boards?.length}
        </h2>

     
          {boards.map((board, index) => (
            <button
              className={`w-full flex items-center space-x-4 px-5 py-4 ${
                board.isActive && "bg-red-500 text-white"
              }`}
            >
              <BoardIcon />
              <p className="text-md">{board.name}</p>
            </button>
          ))}
       

        <div className={`flex items-center space-x-4 px-5 py-4 `}>
          <BoardIcon />
          <button 
            onClick={() => {
              setBoardMenu(false)
              setBoardMode('add')
              setCreateBoardMenu(true)}} 
            className="text-md">
                <AddIcon sx={{ fontSize: ".75rem" }} />
                Create New Board
          </button>
        </div>

        <div className="w-[235px] mx-auto border border-black rounded mt-[1rem] flex items-center justify-center">
          <div className="flex items-center justify-between w-[150px] mx-auto p-2">
            <div>
              <LightModeOutlinedIcon />
            </div>
            <div>
              <DrkMdSwitch checked={isDarkTheme} toggle={toggleMode} />
            </div>
            <div>
              <DarkModeOutlinedIcon />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default BoardsMenuModal;
