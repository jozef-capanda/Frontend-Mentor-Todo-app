import React, { useState, useEffect, ReactNode, useContext } from "react";
import { firestore, todosCollection } from "../firebase/firebase.config";
import {
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  writeBatch,
  query,
  where,
} from "firebase/firestore";
import {
  addPosition,
  getPositions,
  removePosition,
  updatePosition,
} from "../firebase/dndPositions";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type Positions = {
  all: string[];
  active: string[];
  completed: string[];
};

interface ITodosContext {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, completed: boolean) => void;
  error: boolean;
  isLoading: boolean;
  clearCompleted: () => void;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  positions: Positions;
  setPositions: React.Dispatch<React.SetStateAction<Positions>>;
}

interface TodosContextProps {
  children: ReactNode;
}

const initialValue = {
  todos: [],
  addTodo: (text: string) => {},
  removeTodo: (id: string) => {},
  updateTodo: (id: string, completed: boolean) => {},
  error: false,
  isLoading: false,
  clearCompleted: () => {},
  filterStatus: "all",
  setFilterStatus: () => {},
  positions: { all: [], active: [], completed: [] },
  setPositions: () => {},
};

const TodosContext = React.createContext<ITodosContext>(initialValue);

const TodosContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [positions, setPositions] = useState<Positions>({
    all: [],
    active: [],
    completed: [],
  });

  const getTodos = async (): Promise<Todo[] | undefined> => {
    setError(false);
    try {
      const docTodosSnap = await getDocs(todosCollection);
      const todos = docTodosSnap.docs.map((doc) => {
        return {
          id: doc.id,
          text: doc.data().text,
          completed: doc.data().completed,
        };
      });
      return todos;
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const addTodo = async (text: string): Promise<void> => {
    setError(false);
    try {
      const todoRef = await addDoc(todosCollection, {
        text,
        completed: false,
      });

      const newTodo = {
        id: todoRef.id,
        text: text,
        completed: false,
      };

      addPosition(todoRef.id);

      setTodos([...todos, newTodo]);
      setPositions((prevState) => ({
        ...prevState,
        all: [...prevState.all, todoRef.id],
        active: [...prevState.active, todoRef.id],
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const updateTodo = async (id: string, completed: boolean) => {
    setError(false);
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !completed };
        }
        return todo;
      });

      setTodos(updatedTodos);

      if (completed) {
        setPositions((prevState) => ({
          ...prevState,
          active: [...prevState.active, id],
          completed: prevState.completed.filter((item) => item !== id),
        }));
      } else {
        setPositions((prevState) => ({
          ...prevState,
          active: prevState.active.filter((item) => item !== id),
          completed: [...prevState.completed, id],
        }));
      }

      const docRef = doc(firestore, `todos/${id}`);
      await updateDoc(docRef, { completed: !completed });
      await updatePosition(id, completed);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const removeTodo = async (id: string): Promise<void> => {
    setError(false);
    let tempTodos = [...todos];
    try {
      const newTodos = tempTodos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      setPositions((prevState) => ({
        all: prevState.all.filter((item) => item !== id),
        active: prevState.active.filter((item) => item !== id),
        completed: prevState.completed.filter((item) => item !== id),
      }));
      const document = doc(firestore, `todos/${id}`);
      await deleteDoc(document);
      await removePosition(id);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const clearCompleted = async (): Promise<void> => {
    setError(false);
    const tempTodos = [...todos];
    try {
      const newTodos = tempTodos.filter((todo) => todo.completed === false);

      setTodos(newTodos);

      const q = query(todosCollection, where("completed", "==", true));
      const batch = writeBatch(firestore);
      const toDel = await getDocs(q);
      toDel.forEach((doc) => {
        removePosition(doc.ref.id);
        batch.delete(doc.ref);
      });
      await batch.commit();

      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      const todos = await getTodos();
      const positions = await getPositions();
      if (positions && todos) {
        setPositions(positions);
        setTodos(todos);
      }
      setIsLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        filterStatus,
        setFilterStatus,
        addTodo,
        removeTodo,
        updateTodo,
        error,
        isLoading,
        clearCompleted,
        positions,
        setPositions,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

const useTodosContext = () => useContext(TodosContext);

export { TodosContextProvider, useTodosContext };
