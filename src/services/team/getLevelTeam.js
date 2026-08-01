import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function getLevelTeam(userId) {
  const snapshot = await get(ref(database, "users"));

  if (!snapshot.exists()) {
    return [];
  }

  const users = snapshot.val();

  // Sponsor Map
  const sponsorMap = {};

  for (const id in users) {
    const sponsorId = users[id]?.profile?.sponsorId;

    if (!sponsorId) continue;

    if (!sponsorMap[sponsorId]) {
      sponsorMap[sponsorId] = [];
    }

    sponsorMap[sponsorId].push(id);
  }

  const levelTeam = [];

  let currentLevel = [userId];

  for (let level = 1; level <= 10; level++) {
    const nextLevel = [];

    for (const memberId of currentLevel) {
      const directMembers = sponsorMap[memberId] || [];

      for (const childId of directMembers) {
        nextLevel.push(childId);

        const member = users[childId];

        if (member) {
          levelTeam.push({
  ...member,
  level,
});
        }
      }
    }

    currentLevel = nextLevel;
  }

  return levelTeam;
}