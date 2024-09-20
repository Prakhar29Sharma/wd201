const todoList = () => {
  let all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    return all.filter((todo) => {
      let dateToday = new Date();
      let dueDate = new Date(todo.dueDate);
      if (todo.dueDate === dateToday.toISOString().split("T")[0]) {
        return false;
      }
      return dueDate < dateToday;
    });
  }

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    return all.filter((todo) => {
      let dateToday = new Date().toISOString().split("T")[0];
      let dueDate = new Date(todo.dueDate).toISOString().split("T")[0];
      return dateToday === dueDate;
    });
  }

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    return all.filter((todo) => {
      let dateToday = new Date();
      let dueDate = new Date(todo.dueDate);
      return dueDate > dateToday;
    });
  }

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let output = [];
    list.forEach((todoItem) => {
      let resultString = "";
      todoItem.completed ? resultString += "[x]" : resultString += "[ ]";
      resultString += " ";
      resultString += todoItem.title;
      resultString += " ";
      (todoItem.dueDate === new Date().toISOString().split("T")[0]) ? resultString += "" : resultString += todoItem.dueDate;
      output.push(resultString);
    });
    return output.join("\n");
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};

module.exports = todoList;