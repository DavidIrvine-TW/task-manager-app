import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import boardsSlice from "../../redux/boardsSlice";

const AddEditBoardModal = ({ setCreateBoardMenu, type, setBoardMode }) => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");
  const [boardNameError, setBoardNameError] = useState("");
  const [createdColumnsError, setCreatedColumnError] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const [createdColumns, setCreatedColumns] = useState([
    {
      name: "Todo",
      task: [],
      id: uuidv4(),
    },
    {
      name: "Doing",
      task: [],
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
      return true;
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
      className="fade-in absolute top-0 right-0 left-0 bottom-0 bg-zinc-500 bg-opacity-30 z-10 flex items-center justify-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setCreateBoardMenu(false);
        setBoardMode("");
      }}
    >
      <form
        className="absolute top-[6rem] w-[345px] rounded bg-white shadow-md p-6"
        onSubmit={onSubmit}
      >
        <h3 className=" text-l mb-[1.5rem]">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        <div className="flex flex-col mb-[1.5rem]">
          <label className="text-sm mb-[.5rem]">Board Name</label>
          <input
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            className="border text-body-l p-2"
            placeholder="eg. web design"
            id="board-name-input"
          />
          <span className="text-red-500 text-body-md mt-[4px]">
            {boardNameError}
          </span>
        </div>

        <div>
          <div>
            <label className="text-sm ">Board Columns</label>
            {createdColumns.map((column, index) => {
              return (
                <div
                  className="flex gap-[1rem] items-center w-full mt-[.5rem] "
                  key={index}
                >
                  <input
                    className="border w-full text-body-l p-2"
                    onChange={(e) => {
                      onChange(column.id, e.target.value);
                    }}
                    type="text"
                    value={column.name}
                  />
                  <button
                    onClick={() => onDelete(column.id)}
                    className="cursor-pointer"
                  >
                    <DeleteForeverOutlinedIcon fontSize="medium" />
                  </button>
                </div>
              );
            })}
            <span className="text-red-500 text-body-md ">
              {createdColumnsError}
            </span>
          </div>

          <div className="flex flex-col gap-[1.5rem] mt-[1.5rem]">
            <button
              type="button"
              className="border flex items-center justify-center py-2 rounded"
              onClick={() => {
                setCreatedColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              <AddIcon sx={{ fontSize: ".75rem" }} />
              New Column
            </button>

            <button
              className="border py-2 rounded"
              onClick={() => {
                onSubmit(e);
              }}
              type="submit"
            >
              {" "}
              {type === "add" ? "Create Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddEditBoardModal;
