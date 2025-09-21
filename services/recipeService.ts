import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Recipe } from "@/types/recipe";


interface saveRecipe {
      title: string,
      note: string,
      date: string,
      time: string,
      email?: string
}

export const saveRecipe = async (reminder: Recipe) => {
    console.log("Saving recipe..........:", reminder);
    const { title, note, date, time, email } = reminder;
    const reminderData: saveRecipe = { title, note, date, time };
    if (email) {
        reminderData.email = email;
    }
    try {
        const docRef = await addDoc(collection(db, "reminders"), reminderData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const remindersSnapshot = await getDocs(collection(db, "recipes")); // use "reminders" not "reminder"
    console.log("Fetched recipes:", remindersSnapshot.docs);
    return remindersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];
  } catch (e) {
    console.error("Error fetching recipes: ", e);
    throw e;
  }
};

export const updateRecipe = async (id: string, updatedData: Partial<Recipe>) => {
    try {
        const docRef = doc(db, "recipes", id);
        await updateDoc(docRef, updatedData);
        console.log("Recipe updated!");
    } catch (error) {
        console.error("Error updating recipe:", error);
    }
}

export const deleteRecipe = async (id: string) => {
  try {
    const docRef = doc(db, "recipes", id);
    await deleteDoc(docRef);
    console.log("Recipe deleted!");
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};
