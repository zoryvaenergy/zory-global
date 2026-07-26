export function createUserModel({
  firebaseUid,
  userId,
  fullName,
  mobile,
  email,
  password,
  sponsorId,
}) {
  return {
    auth: {
      firebaseUid,
      email,
      password,
      status: "ACTIVE",
      createdAt: Date.now(),
    },

   profile: {
  userId,
  fullName,
  mobile,
  sponsorId,

      joinDate: new Date().toLocaleDateString("en-GB"),

      joinTime: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },

    pools: {
      currentPool: 1,

      pool1: {
        sequence: 0,
        currentStep: 1,

        step1Count: 0,
        step2Count: 0,
        step3Count: 0,
        step4Count: 0,

        totalMembers: 0,
        totalIncome: 0,

        completed: false,

        joinedAt: Date.now(),
      },
    },

    wallet: {},

    team: {

  // Direct Team
  directCount: 0,

  // Level Counts
  level1Count: 0,
  level2Count: 0,
  level3Count: 0,
  level4Count: 0,
  level5Count: 0,
  level6Count: 0,
  level7Count: 0,
  level8Count: 0,
  level9Count: 0,
  level10Count: 0,

  // Total Sponsor Network
  totalTeam: 0,

},

    income: {},
  };
}