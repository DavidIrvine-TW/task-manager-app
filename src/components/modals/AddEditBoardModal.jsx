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
      className="addEditModal"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setCreateBoardMenu(false);
        setBoardMode("");
      }}
    >
      <form
        className="addEditModal__form"
        onSubmit={onSubmit}
      >
        <div className="addEditModal__form-head">
          <h3 className="text-l">
            {type === "edit" ? "Edit" : "Add New"} Board
          </h3>
          <button
            className="addEditModal__form-closebtn"
            onClick={() => setCreateBoardMenu(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="addEditModal__form-cont-title">
          <label className="addEditModal__board-name">Board Name*</label>
          <input
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            className="border text-body-l p-2 rounded"
            placeholder="eg. web design"
            id="board-name-input"
          />
          <span className="addEditModal__form-error">
            {boardNameError}
          </span>
        </div>

        <div>
          <div>
            <label className="addEditModal__form_column-label">Board Columns*</label>

            {createdColumns.map((column, index) => {
              return (
                <div
                  className="addEditModal__form_createColumn-cont"
                  key={index}
                >
                  <input
                    className="addEditModal__form-input"
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
                    <DeleteForeverOutlinedIcon fontSize="medium" className="addEditModal__column-delete"/>
                  </button>
                </div>
              );
            })}
            <span className="addEditModal__form-error ">
              {createdColumnsError}
            </span>
          </div>

          {isDisabled ? (
            <span className="addEditModal__form-error">Max columns (5)</span>
          ) : (
            ""
          )}
          <div className="addEditModal__btn-cont">
            <button
              type="button"
              className="addEditMenu__newColumn-btn"
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
              className="addEditModal__btn-submit"
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
