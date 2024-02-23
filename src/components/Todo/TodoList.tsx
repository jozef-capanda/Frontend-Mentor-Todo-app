import { Todo, useTodosContext } from "../../context/TodosContext";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import { filterTodos } from "../../utils";
import { updatePositions } from "../../firebase/dragAndDropPositions";

const TodoList = () => {
  const { todos, filterStatus, positions, setPositions } = useTodosContext();
  let filteredTodos: Todo[] = filterTodos(todos, filterStatus, positions);

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newTodos = Array.from(filteredTodos);
    const [newOrder] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, newOrder);

    filteredTodos = [...newTodos];
    const ids = newTodos.map((todo) => todo.id);
    updatePositions(ids, filterStatus);
    setPositions((prevState) => ({ ...prevState, [filterStatus]: ids }));
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            className="todo__list"
            aria-label="Todos"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredTodos.length > 0 ? (
              filteredTodos?.map((todo, index) => {
                return <TodoItem key={todo.id} index={index} todo={todo} />;
              })
            ) : (
              <p className="message">Your list is empty.</p>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
