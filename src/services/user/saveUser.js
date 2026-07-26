import { ref, set } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function saveUser(userId, userData) {
  await set(ref(database, "users/" + userId), userData);
}