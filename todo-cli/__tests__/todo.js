/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add } = todoList();

describe("Todolist Test Suite", () => {
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  var dateToday = new Date();

  const today = formattedDate(dateToday);

  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1)),
  );

  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1)),
  );

  beforeAll(() => {
    add({
      title: "Test task 1",
      completed: false,
      dueDate: today,
    });
    add({
      title: "Test task 2",
      completed: false,
      dueDate: yesterday,
    });
    add({
      title: "Test task 3",
      completed: false,
      dueDate: tomorrow,
    });
  });

  test("Should add a new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test task 4",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  // test for overdue
  test("Should get overdue todo", () => {
    const overdueTodos = all.filter((todoItem) => {
      if (todoItem.dueDate === new Date().toISOString().split("T")[0])
        return false;
      return new Date(todoItem.dueDate) < new Date();
    });
    expect(overdueTodos.length).toBe(1);
  });

  // test for due today
  test("Should get tasks due today", () => {
    const dueTodayTodos = all.filter((todoItem) => {
      return todoItem.dueDate === new Date().toISOString().split("T")[0];
    });
    expect(dueTodayTodos.length).toBe(2);
  });

  // test for due later
  test("Should get tasks due later", () => {
    const dueLaterTodos = all.filter((todoItem) => {
      return new Date(todoItem.dueDate) > new Date();
    });
    expect(dueLaterTodos.length).toBe(1);
  });
});
