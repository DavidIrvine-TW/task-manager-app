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
      className={`${sideNavOpen ? "" : "transform -translate-x-full "} 
      transition-all duration-500 dk:w-[300px] tb:w-[260px] border-r p-[1rem]
      hidden tb:inline-flex dk:inline-flex  z-10  fade-in flex-col pb-[2rem] fixed  border-darksecondary bg-lghtsecondary`}
      style={{ height: "calc(100vh - 6rem)" }}
    >
      <h2 className="tracking-[2.4px] text-sm mb-[1.5rem] px-4 font-bold text-lghttext">
        ALL BOARDS: {boards?.length}
      </h2>

      <div className="max-h-[600px] min-h-[300px] overflow-y-auto ">
        {boards.map((board, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded ${
              board.isActive
                ? "bg-lghtaccent text-darktext shadow-md"
                : " hover:bg-secondary-200 "
            }`}
            onClick={() => {
              dispatch(boardsSlice.actions.setBoardActive({ index }));
            }}
          >
            <BoardIcon />
            <p className="text-md truncate">{board.name}</p>
          </button>
        ))}
      </div>

      <div
        className={`flex items-center space-x-4 px-5 py-4 my-[1rem] mb-auto rounded  hover:bg-secondary-200`}
      >
        <BoardIcon />
        <button
          onClick={() => {
            setBoardMenu(false);
            setBoardMode("add");
            setCreateBoardMenu(true);
          }}
          className="text-md text-lghtprimary"
        >
          <AddIcon sx={{ fontSize: ".75rem" }} />
          Create New Board
        </button>
      </div>

      <div className="w-full h-full mx-auto flex items-end py-[2rem] ">
        <div className="flex items-center border border-lghtaccent rounded justify-between w-full h-[3rem] mx-auto p-2 dk:p-3 bg-lghtbackground">
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

      {/* hide sidenav*/}

      <div className="mx-auto">
        <button onClick={handleHideSideNav} className="flex gap-[.5rem]">
          <VisibilityOffIcon /> Hide Sidebar
        </button>
      </div>

      {/* reveal sidenav*/}
      {!sideNavOpen ? (
        <div className="relative z-200 shadow-md">
          <button
            className="absolute bottom-[2rem] right-[-4rem] cursor-pointer bg-darkbackground text-white rounded p-1 "
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
