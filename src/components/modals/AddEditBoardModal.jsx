import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import boardsSlice from "../../redux/boardsSlice";
import CloseIcon from "@mui/icons-material/Close";

const AddEditBoardModal = ({ setCreateBoardMenu, type, setBoardMode }) => {
  
  const dispatch = useDispatch();

  const [boardName, setBoardName] = useState("");
  const [boardNameError, setBoardNameError] = useState("");
  const [createdColumnsError, setCreatedColumnError] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [createdColumns, setCreatedColumns] = useState([
    {
      name: "",
      tasks: [],
      id: uuidv4(),
    },
  ]);

  console.log(type);
  console.log(createdColumnsError);
  console.log(boardNameError);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setCreatedColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setBoardName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setCreatedColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setCreatedColumns((prevState) => prevState.filter((el) => el.id !== id));
    setIsDisabled(false);
  };

  const formValidate = async () => {
    setCreatedColumnError("");
    setBoardNameError("");
    setIsValid(true);

    if (!boardName.trim()) {
      setBoardNameError("Enter a board name");
      setIsValid(false);
      return false;
    }

    // Asynchronously validate columns
    const columnValidationPromises = createdColumns.map(async (column) => {
      if (!column.name.trim()) {
        setCreatedColumnError("Enter a column name");
        setIsValid(false);
        return false;
      }
    });

    // Wait for all column validations to complete
    const columnValidationResults = await Promise.all(columnValidationPromises);

    // Check if any validation failed
    if (columnValidationResults.includes(false)) {
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = await formValidate();
    if (isFormValid) {
      if (type === "add") {
        dispatch(boardsSlice.actions.addBoard({ boardName, createdColumns }));
      } else if (type === "edit") {
        dispatch(boardsSlice.actions.editBoard({ boardName, createdColumns }));
      }
      setCreateBoardMenu(false);
    }
  };

  return (
    <section
      id="add-edit-board-modal"
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 dark:bg-darkbackground dark:bg-opacity-80 bg-opacity-50 z-20 flex items-center justify-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setCreateBoardMenu(false);
        setBoardMode("");
      }}
    >
      <form
        className=" w-[345px] tb:w-[480px] rounded bg-lghtbackground dark:bg-drkbackground-950 shadow-md p-6"
        onSubmit={onSubmit}
      >
        <div className="flex justify-between items-center mb-[1.5rem] dark:text-drksecondary-700">
          <h3 className="text-l">
            {type === "edit" ? "Edit" : "Add New"} Board
          </h3>
          <button
            className="border rounded-full p-1 hover:scale-105"
            onClick={() => setCreateBoardMenu(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col mb-[1.5rem]">
          <label className="text-sm mb-[.5rem] dark:text-gray-500">Board Name*</label>
          <input
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            className="border text-body-l p-2 rounded"
            placeholder="eg. web design"
            id="board-name-input"
          />
          <span className="text-red-500 text-body-md mt-[4px]">
            {boardNameError}
          </span>
        </div>

        <div>
          <div>
            <label className="text-sm dark:text-gray-500">Board Columns*</label>

            {createdColumns.map((column, index) => {
              return (
                <div
                  className="flex gap-[1rem] items-center w-full mt-[.5rem] "
                  key={index}
                >
                  <input
                    className="border w-full text-body-l p-2 rounded"
                    onChange={(e) => {
                      onChange(column.id, e.target.value);
                    }}
                    type="text"
                    value={column.name}
                    placeholder="e.g. Todo"
                  />
                  <button
                    onClick={() => onDelete(column.id)}
                    className="cursor-pointer"
                  >
                    <DeleteForeverOutlinedIcon fontSize="medium" className="hover:text-red-500 hover:scale-110 dark:text-gray-500 hover:dark:text-red-500"/>
                  </button>
                </div>
              );
            })}
            <span className="text-red-500 text-body-md ">
              {createdColumnsError}
            </span>
          </div>
          {isDisabled ? (
            <span className="text-red-500 text-body-md ">Max columns (5)</span>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-[1.5rem] mt-[1.5rem]">
            <button
              type="button"
              className="border flex items-center justify-center py-2 rounded bg-lghtsecondary hover:bg-secondary-50 dark:bg-drksecondary-300 hover:dark:bg-secondary-200 dark:border-darksecondary"
              disabled={isDisabled}
              onClick={() => {
                if (createdColumns.length > 4) {
                  setIsDisabled(true);
                  return;
                }
                setCreatedColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
                setIsDisabled(false);
              }}
            >
              <AddIcon sx={{ fontSize: ".75rem" }} />
              New Column
            </button>

            <button
              className="border py-2 rounded bg-lghtaccent hover:bg-accent-300 dark:bg-drksecondary-800  hover:dark:bg-drksecondary-900 dark:border-darksecondary hover:dark:text-darktext  text-lghttext font-bold shadow-md"
              onClick={() => {
                onSubmit(e);
              }}
              type="submit"
            >
              {" "}
              {type === "add" ? "Create Board" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddEditBoardModal;
