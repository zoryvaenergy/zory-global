import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function getAllUsers() {
  try {
    const usersRef = ref(database, "users");

    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const users = snapshot.val();

    return Object.entries(users).map(([userId, user]) => ({
      userId,
      ...user,
    }));

  } catch (error) {
    console.error("Get All Users Error :", error);

    return [];
  }
}