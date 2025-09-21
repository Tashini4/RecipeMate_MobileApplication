import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Recipe } from "@/types/recipe";


interface saveReminder {
      title: string,
      note: string,
      date: string,
      time: string,
      email?: string
}

export const saveRecipe = async (reminder: Recipe) => {
    console.log("Saving reminder..........:", reminder);
    const { title, note, date, time, email } = reminder;
    const reminderData: saveReminder = { title, note, date, time };
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
    const remindersSnapshot = await getDocs(collection(db, "reminders")); // use "reminders" not "reminder"
    console.log("Fetched reminders:", remindersSnapshot.docs);
    return remindersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];
  } catch (e) {
    console.error("Error fetching reminders: ", e);
    throw e;
  }
};

export const updateRecipe = async (id: string, updatedData: Partial<Recipe>) => {
    try {
        const docRef = doc(db, "reminders", id);
        await updateDoc(docRef, updatedData);
        console.log("Reminder updated!");
    } catch (error) {
        console.error("Error updating reminder:", error);
    }
}

export const deleteRecipe = async (id: string) => {
  try {
    const docRef = doc(db, "reminders", id);
    await deleteDoc(docRef);
    console.log("Reminder deleted!");
  } catch (error) {
    console.error("Error deleting reminder:", error);
  }
};
