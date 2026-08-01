import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function buildAncestorChain(parentSequence, poolKey = "pool1") {

  const chain = [];

  let currentSequence = parentSequence;

  while (currentSequence !== 0) {

    // Sequence → UserId
    const indexSnapshot = await get(
      ref(
        database,
        `poolSystem/${poolKey}/sequenceIndex/${currentSequence}`
      )
    );

    if (!indexSnapshot.exists()) {
      throw new Error("Sequence Index Not Found");
    }

    const userId = indexSnapshot.val();

    // User Data
    const userSnapshot = await get(
      ref(database, "users/" + userId)
    );

    if (!userSnapshot.exists()) {
      throw new Error("User Not Found");
    }

    const userData = userSnapshot.val();

    chain.push({
      userId,
      sequence: currentSequence,
      parentSequence:
    userData?.pools?.[poolKey]?.parentSequence || 0,
    });

    currentSequence =
      userData?.pools?.[poolKey]?.parentSequence || 0;
  }

  return chain;
}