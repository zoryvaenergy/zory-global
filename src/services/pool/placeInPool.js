import { ref, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function placeInPool(userUid, poolData) {

  await update(ref(database, "users/" + userUid), {
    "pools/pool1.position": poolData.position,
    "pools/pool1.parentSequence": poolData.parentSequence,
    "pools/pool1.parentUserId": poolData.parentUserId,
  });

}