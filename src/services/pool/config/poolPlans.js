export const POOL_PLANS = {

  pool1: {
    poolNumber: 1,

    planEntry: 7,
    poolEntry: 2,
    baseIncome: 1,

    requiredDirect: 2,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool2",

    steps: {
      step1: {
        users: 3,
        income: 3,
      },
      step2: {
        users: 9,
        income: 9,
      },
      step3: {
        users: 27,
        income: 27,
      },
      step4: {
        users: 81,
        income: 81,
      },
    },

    totalMembers: 120,
    totalIncome: 120,
  },

  pool2: {
    poolNumber: 2,

    planEntry: 10,
    poolEntry: 10,
    baseIncome: 5,

    requiredDirect: 5,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool3",

    steps: {
      step1: { users: 3, income: 15 },
      step2: { users: 9, income: 45 },
      step3: { users: 27, income: 135 },
      step4: { users: 81, income: 405 },
    },

    totalMembers: 120,
    totalIncome: 600,
  },

  pool3: {
    poolNumber: 3,

    planEntry: 20,
    poolEntry: 20,
    baseIncome: 10,

    requiredDirect: 5,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool4",

    steps: {
      step1: { users: 3, income: 30 },
      step2: { users: 9, income: 90 },
      step3: { users: 27, income: 270 },
      step4: { users: 81, income: 810 },
    },

    totalMembers: 120,
    totalIncome: 1200,
  },

  pool4: {
    poolNumber: 4,

    planEntry: 30,
    poolEntry: 30,
    baseIncome: 15,

    requiredDirect: 5,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool5",

    steps: {
      step1: { users: 3, income: 45 },
      step2: { users: 9, income: 135 },
      step3: { users: 27, income: 405 },
      step4: { users: 81, income: 1215 },
    },

    totalMembers: 120,
    totalIncome: 1800,
  },

  pool5: {
    poolNumber: 5,

    planEntry: 50,
    poolEntry: 50,
    baseIncome: 25,

    requiredDirect: 10,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool6",

    steps: {
      step1: { users: 3, income: 75 },
      step2: { users: 9, income: 225 },
      step3: { users: 27, income: 675 },
      step4: { users: 81, income: 2025 },
    },

    totalMembers: 120,
    totalIncome: 3000,
  },

  pool6: {
    poolNumber: 6,

    planEntry: 100,
    poolEntry: 100,
    baseIncome: 50,

    requiredDirect: 20,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool7",

    steps: {
      step1: { users: 3, income: 150 },
      step2: { users: 9, income: 450 },
      step3: { users: 27, income: 1350 },
      step4: { users: 81, income: 4050 },
    },

    totalMembers: 120,
    totalIncome: 6000,
  },

  pool7: {
    poolNumber: 7,

    planEntry: 500,
    poolEntry: 500,
    baseIncome: 250,

    requiredDirect: 50,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool8",

    steps: {
      step1: { users: 3, income: 750 },
      step2: { users: 9, income: 2250 },
      step3: { users: 27, income: 6750 },
      step4: { users: 81, income: 20250 },
    },

    totalMembers: 120,
    totalIncome: 30000,
  },

  pool8: {
    poolNumber: 8,

    planEntry: 1000,
    poolEntry: 1000,
    baseIncome: 500,

    requiredDirect: 101,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool9",

    steps: {
      step1: { users: 3, income: 1500 },
      step2: { users: 9, income: 4500 },
      step3: { users: 27, income: 13500 },
      step4: { users: 81, income: 40500 },
    },

    totalMembers: 120,
    totalIncome: 60000,
  },

  pool9: {
    poolNumber: 9,

    planEntry: 2000,
    poolEntry: 2000,
    baseIncome: 1000,

    requiredDirect: 251,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: true,
    lockIncome: true,
    nextPool: "pool10",

    steps: {
      step1: { users: 3, income: 3000 },
      step2: { users: 9, income: 9000 },
      step3: { users: 27, income: 27000 },
      step4: { users: 81, income: 81000 },
    },

    totalMembers: 120,
    totalIncome: 120000,
  },

  pool10: {
    poolNumber: 10,

    planEntry: 5000,
    poolEntry: 5000,
    baseIncome: 2500,

    requiredDirect: 501,
    unlockType: "DIRECT",
    completedStep: 4,
    autoUpgrade: false,
    lockIncome: false,
    nextPool: null,

    steps: {
      step1: { users: 3, income: 7500 },
      step2: { users: 9, income: 22500 },
      step3: { users: 27, income: 67500 },
      step4: { users: 81, income: 202500 },
    },

    totalMembers: 120,
    totalIncome: 300000,
  },

};