import crossIcon from "../../assets/icons/icon-cross.svg";
import { Draggable } from "react-beautiful-dnd";
import { Todo, useTodosContext } from "../../context/TodosContext";

interface TodoItemProps {
  todo: Todo;
  index: number;
}

const TodoItem = ({ index, todo }: TodoItemProps) => {
  const { removeTodo, updateTodo } = useTodosContext();
  const { id, completed, text } = todo;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className="todo__item"
          title="Drag and drop todo"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            type="checkbox"
            className="todo__item-checkbox"
            checked={completed}
            onChange={() => updateTodo(id, completed)}
            title={!completed ? "Set todo as completed" : "Set todo as active"}
            aria-label={
              !completed ? "Set todo as completed" : "Set todo as active"
            }
          />

          <p className="todo__item-text">{text}</p>
          <button
            className="btn btn--delete"
            type="button"
            onClick={() => removeTodo(id)}
            title="Remove todo"
            aria-label="Remove todo"
          >
            <img src={crossIcon} alt="" />
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
