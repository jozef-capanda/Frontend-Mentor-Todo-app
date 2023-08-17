import { Positions, Todo } from "../context/TodosContext";

export const filterTodos = (
  todos: Todo[],
  filterStatus: string,
  positions: Positions
): Todo[] => {
  const { all, active, completed } = positions;
  switch (filterStatus) {
    case "all":
      return todos.sort((a, b) => all.indexOf(a.id) - all.indexOf(b.id));

    case "active":
      return todos
        .filter((todo) => todo.completed === false)
        .sort((a, b) => active.indexOf(a.id) - active.indexOf(b.id));
    case "completed":
      return todos
        .filter((todo) => todo.completed === true)
        .sort((a, b) => completed.indexOf(a.id) - completed.indexOf(b.id));
    default:
      return todos;
  }
};
