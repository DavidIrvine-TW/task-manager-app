import React from "react";
import BoardIcon from "../icons/boardIcon";
import AddIcon from "@mui/icons-material/Add";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DrkMdSwitch from "../switch/DrkMdSwitch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useToggle from "../../hooks/useToggle";
import boardsSlice from "../../redux/boardsSlice";

const SideNav = ({
  setSideNavOpen,
  sideNavOpen,
  setBoardMenu,
  setBoardMode,
  setCreateBoardMenu,
}) => {
  const [isDarkTheme, toggleMode] = useToggle(
    localStorage.getItem("theme-color") === "dark"
  );

  useEffect(() => {
    document.documentElement.className = isDarkTheme ? "dark" : "";
    localStorage.setItem("theme-color", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const handleHideSideNav = () => {
    setSideNavOpen(false);
  };

  const handleRevealSideNav = () => {
    setSideNavOpen(true);
  };

  return (
    <div
      id="sidenav"
      style={{ height: "calc(100vh - 6rem)" }}
      className={`Nav__theme ${sideNavOpen ? "" : "transform -translate-x-full "} 
      transition-all duration-500 dk:w-[300px] tb:w-[260px] border-r p-[1rem]
      hidden tb:inline-flex dk:inline-flex fade-in flex-col pb-[2rem] fixed  z-10 `}
      
    >

      {/* number of boards */}
      <h2 className="tracking-[2.4px] text-sm mb-[1.5rem] px-4 font-bold text-lghttext dark:text-darktext">
        ALL BOARDS: {boards?.length}
      </h2>

      {/* list all boards*/}
      <div className="max-h-[600px] min-h-[300px] overflow-y-auto flex-grow">
        {boards.map((board, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded ${
              board.isActive
                ? "bg-lghtaccent text-darktext dark:bg-drksecondary-800 shadow-md "
                : "hover:bg-secondary-200 hover:dark:bg-drksecondary-900 dark:text-drksecondary-700"
            }`}
            onClick={() => {
              dispatch(boardsSlice.actions.setBoardActive({ index }));
            }}
          >
            <BoardIcon />
            <p className="text-md truncate " >{board.name}</p>
          </button>
        ))}
      </div>


      {/* create a new board */}
      <div
        className={`flex items-center space-x-4 px-5 py-4 my-[1rem] mb-auto rounded  hover:bg-secondary-200 hover:dark:bg-drkprimary-800`}
      >
        <BoardIcon />
        <button
          onClick={() => {
            setBoardMenu(false);
            setBoardMode("add");
            setCreateBoardMenu(true);
          }}
          className="text-md text-lghtprimary dark:text-darkprimary"
        >
          <AddIcon sx={{ fontSize: ".75rem" }} />
          Create New Board
        </button>
      </div>

      {/* dark mode switch*/}
      <div className="w-full h-full mx-auto flex items-end py-[2rem] ">
        <div className="flex items-center border border-lghtaccent dark:border-darksecondary rounded justify-between w-full h-[3rem] mx-auto p-2 dk:p-3 bg-lghtbackground dark:bg-darkbackground">
          <div>
            <LightModeOutlinedIcon className="dark:text-darksecondary"/>
          </div>
          <div>
            <DrkMdSwitch checked={isDarkTheme} toggle={toggleMode} />
          </div>
          <div>
            <DarkModeOutlinedIcon className="dark:text-darksecondary"/>
          </div>
        </div>
      </div>


      {/* hide sidenav*/}
      <div className="mx-auto">
        <button onClick={handleHideSideNav} className="flex gap-[.5rem] dark:text-darktext">
          <VisibilityOffIcon /> Hide Sidebar
        </button>
      </div>

      {/* reveal sidenav*/}
      {!sideNavOpen ? (
        <div className="relative z-200 shadow-md">
          <button
            className="absolute bottom-[2rem] right-[-4rem] cursor-pointer bg-darkbackground text-white dark:text-lghttext dark:bg-darkprimary rounded p-1 hover:scale-110 transition duration-200"
            onClick={handleRevealSideNav}
          >
            <VisibilityIcon fontSize="large" />
          </button>
        </div>
      ) : (
        ""
      )}

      
    </div>
  );
};

export default SideNav;
