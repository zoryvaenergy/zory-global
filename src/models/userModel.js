export function createUserModel({
  firebaseUid,
  userId,
  sponsorId,

  walletAddress,
  provider,
  network,
  chainId,
}) {
  return {
        auth: {
  firebaseUid,
  status: "ACTIVE",
  createdAt: Date.now(),
},

    profile: {
      userId,
      
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

    wallet: {

  // Web3 Identity
    address: walletAddress || "",

provider: provider || "",

network: network || "",

chainId: chainId || 0,

  // Wallet Balance
  
      mainWallet: 0,
      lockedWallet: 0,
      withdrawalWallet: 0,

      // Income Summary
      directIncome: 0,
      levelIncome: 0,
      poolIncome: 0,

      // Total Income
      totalIncome: 0,
    },

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

    income: {
      direct: 0,
      level: 0,
      pool: 0,
    },

    token: {
      balance: 0,
      lifetimeEarned: 0,
      lifetimeSpent: 0,
    },
  };
}