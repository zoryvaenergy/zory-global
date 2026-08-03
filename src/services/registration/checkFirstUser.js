import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function checkFirstUser() {

  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  console.log("Users Exists =", snapshot.exists());
  console.log("Users Value =", snapshot.val());

  if (!snapshot.exists()) {
    console.log("FIRST USER");
    return true;
  }

  console.log("NOT FIRST USER");

  return false;
}