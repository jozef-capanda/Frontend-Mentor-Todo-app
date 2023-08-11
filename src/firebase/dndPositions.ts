import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { positionsCollection } from "./firebase.config";
import { Positions } from "../context/TodosContext";

export const getPositions = async (): Promise<Positions | undefined> => {
  try {
    const positionsRef = doc(positionsCollection, "positions");
    const docSnap = await getDoc(positionsRef);
    if (!docSnap.exists()) {
      return { all: [], active: [], completed: [] };
    }
    return docSnap.data() as Positions;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const addPosition = async (todoId: string) => {
  try {
    const positionsRef = doc(positionsCollection, "positions");
    const docSnap = await getDoc(positionsRef);

    if (!docSnap.exists()) {
      await setDoc(positionsRef, {
        all: [todoId],
        active: [todoId],
        completed: [],
      });
    }
    await updateDoc(positionsRef, {
      all: arrayUnion(todoId),
      active: arrayUnion(todoId),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePosition = async (todoId: string, completed: boolean) => {
  try {
    const positionsRef = doc(positionsCollection, "positions");
    if (completed) {
      await updateDoc(positionsRef, {
        active: arrayUnion(todoId),
        completed: arrayRemove(todoId),
      });
    } else {
      await updateDoc(positionsRef, {
        active: arrayRemove(todoId),
        completed: arrayUnion(todoId),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePositions = async (todoIds: string[], key: string) => {
  const positionsRef = doc(positionsCollection, "positions");

  await updateDoc(positionsRef, {
    [key]: todoIds,
  });
};

export const removePosition = async (todoId: string) => {
  try {
    const positionsRef = doc(positionsCollection, "positions");
    await updateDoc(positionsRef, {
      all: arrayRemove(todoId),
      active: arrayRemove(todoId),
      completed: arrayRemove(todoId),
    });
  } catch (error) {
    console.log(error);
  }
};
