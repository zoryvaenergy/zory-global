import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function repairDirectCount() {

  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return;
  }

  const users = snapshot.val();

  for (const userId in users) {

    let actualDirect = 0;

    // पूरे Database में Scan
    for (const id in users) {

      const sponsorId = users[id]?.profile?.sponsorId;

      if (sponsorId === userId) {
        actualDirect++;
      }

    }

    // केवल Direct Count Update
    await update(ref(database, "users/" + userId), {
      "team/directCount": actualDirect,
    });

    console.log(
      "✅",
      userId,
      "Direct Count =",
      actualDirect
    );

  }

  console.log("🎉 Direct Count Repair Completed");

}