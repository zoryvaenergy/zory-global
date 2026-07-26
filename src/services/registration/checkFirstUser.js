import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function checkFirstUser() {

  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  // Database खाली है
  if (!snapshot.exists()) {
    return true;
  }

  // कम से कम एक User मौजूद है
  return false;

}