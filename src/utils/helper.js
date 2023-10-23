export const sameColreorderd = (sourceColumn, sourceIndex, destinationIndex) => {

    const newTasksList = Array.from(sourceColumn.tasks);

    const [removed] = newTasksList.splice(sourceIndex, 1);
  
    newTasksList.splice(destinationIndex, 0, removed);
  
    const newColumn = {
      ...sourceColumn,
      tasks: newTasksList,
    };
  
    return newColumn;
  };

