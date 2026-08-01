import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function getPoolStressData() {

  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return {
      totalUsers: 0,
      completedPools: 0,
      step1Completed: 0,
      step2Completed: 0,
      step3Completed: 0,
      step4Completed: 0,
      users: [],
    };
  }

  const users = snapshot.val();

  const result = {
    totalUsers: 0,
    completedPools: 0,
    step1Completed: 0,
    step2Completed: 0,
    step3Completed: 0,
    step4Completed: 0,
    users: [],
  };

  Object.entries(users).forEach(([userId, user]) => {

    const pool = user?.pools?.pool1;

    if (!pool) {
      return;
    }

    result.totalUsers++;

    if (pool.step1Paid) result.step1Completed++;
    if (pool.step2Paid) result.step2Completed++;
    if (pool.step3Paid) result.step3Completed++;
    if (pool.step4Paid) result.step4Completed++;

    if (pool.completed) {
      result.completedPools++;
    }

    result.users.push({
      userId,
      sequence: pool.sequence || 0,
      parentSequence: pool.parentSequence || 0,
      currentStep: pool.currentStep || 1,
      totalMembers: pool.totalMembers || 0,
      totalIncome: pool.totalIncome || 0,
      step1Count: pool.step1Count || 0,
      step2Count: pool.step2Count || 0,
      step3Count: pool.step3Count || 0,
      step4Count: pool.step4Count || 0,
      step1Paid: pool.step1Paid || false,
      step2Paid: pool.step2Paid || false,
      step3Paid: pool.step3Paid || false,
      step4Paid: pool.step4Paid || false,
      completed: pool.completed || false,
    });

  });

  result.users.sort((a, b) => a.sequence - b.sequence);

  return result;

}