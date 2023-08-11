import { useState } from "react";
import { useTodosContext } from "../../context/TodosContext";

const Form = () => {
  const [textInput, setTextInput] = useState("");
  const { addTodo } = useTodosContext();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!textInput) return;

    addTodo(textInput);
    setTextInput("");
  };

  return (
    <form className="form">
      <button
        type="submit"
        className="btn"
        aria-label="add todo"
        onClick={(e) => handleSubmit(e)}
      >
        <div className="btn btn--form"></div>
      </button>
      <input
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="form__input"
        type="text"
        placeholder="Create a new todo..."
        autoFocus
      />
    </form>
  );
};

export default Form;
