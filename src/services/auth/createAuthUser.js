import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/auth";

export async function createAuthUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}