import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

// ======================================
// Load All Users (One Database Read)
// ======================================
async function loadUsers() {

  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return {};
  }

  return snapshot.val();

}

// ======================================
// Build Sponsor Map
// ======================================
function buildSponsorMap(users) {

  const sponsorMap = {};

  for (const userId in users) {

    const sponsorId = users[userId]?.profile?.sponsorId;

    // Sponsor नहीं है तो Skip
    if (!sponsorId) continue;

    // Sponsor पहली बार मिला
    if (!sponsorMap[sponsorId]) {
      sponsorMap[sponsorId] = [];
    }

    // इस Sponsor के नीचे User जोड़ दो
    sponsorMap[sponsorId].push(userId);

  }

  return sponsorMap;

}
// ======================================
// Build Team Tree
// ======================================
export async function buildTeamTree(userId) {

}

// ======================================
// Direct Count
// ======================================
export async function calculateDirectCount(userId) {
const users = await loadUsers();

const sponsorMap = buildSponsorMap(users);
const directMembers = sponsorMap[userId] || [];
return directMembers.length;
}

// ======================================
// Total Team
// ======================================
export async function calculateTotalTeam(userId) {
const users = await loadUsers();

const sponsorMap = buildSponsorMap(users);
function countTeam(currentUserId) {
const directMembers = sponsorMap[currentUserId] || [];
let total = 0;
for (const memberId of directMembers) {
total++;
total += countTeam(memberId);
}
return total;
}


return countTeam(userId);
}

// ======================================
// Level Counts
// ======================================
export async function calculateLevelCounts(userId) {

}

// ======================================
// Master Summary
// ======================================
export async function getTeamSummary(userId) {

}