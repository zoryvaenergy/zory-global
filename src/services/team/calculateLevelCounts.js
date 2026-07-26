import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function calculateLevelCounts(userId) {

  const snapshot = await get(ref(database, "users"));

  if (!snapshot.exists()) {
    return {
      levelCounts: {},
      levelMembers: {},
    };
  }

  const users = snapshot.val();

  const sponsorMap = {};

  // Sponsor Map Build
  for (const id in users) {

    const sponsorId = users[id]?.profile?.sponsorId;

    if (!sponsorId) continue;

    if (!sponsorMap[sponsorId]) {
      sponsorMap[sponsorId] = [];
    }

    sponsorMap[sponsorId].push(id);

  }

  const levelCounts = {};
  const levelMembers = {};

  let currentLevel = [userId];

  for (let level = 1; level <= 10; level++) {

    const nextLevel = [];

    for (const memberId of currentLevel) {

      const directMembers = sponsorMap[memberId] || [];

      nextLevel.push(...directMembers);

    }

    levelCounts[`level${level}Count`] = nextLevel.length;

    levelMembers[`level${level}`] = nextLevel;

    currentLevel = nextLevel;

  }

  return {

    levelCounts,

    levelMembers

  };

}