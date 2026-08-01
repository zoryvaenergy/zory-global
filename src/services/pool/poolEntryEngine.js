import { POOL_PLANS } from "./config/poolPlans";

export function poolEntryEngine(currentPoolNumber) {

  const currentPoolKey = `pool${currentPoolNumber}`;
  const currentPlan = POOL_PLANS[currentPoolKey];

  if (!currentPlan) {
    throw new Error(`Invalid Pool : ${currentPoolKey}`);
  }

  const nextPoolNumber = currentPoolNumber + 1;
  const nextPoolKey = currentPlan.nextPool;

  const stepIncome =
    currentPlan.steps[`step${currentPlan.completedStep}`].income;

  // Pool10 के बाद कोई अगला Pool नहीं
  if (!nextPoolKey) {
    return {
      currentPool: currentPoolKey,
      nextPool: null,

      stepIncome,
      nextPoolEntry: 0,
      payableIncome: stepIncome,

      autoUpgrade: false,
      lockIncome: false,
    };
  }

  const nextPlan = POOL_PLANS[nextPoolKey];

  const nextPoolEntry = nextPlan.poolEntry;

  const payableIncome =
  stepIncome - nextPoolEntry;
if (payableIncome < 0) {
  throw new Error(
    `Invalid Pool Configuration: ${currentPoolKey}`
  );
}
  return {

    currentPool: currentPoolKey,

    nextPool: nextPoolKey,

    currentPoolNumber,

    nextPoolNumber,

    stepIncome,

    nextPoolEntry,

    payableIncome,

    requiredDirect: currentPlan.requiredDirect,

    unlockType: currentPlan.unlockType,

    autoUpgrade: currentPlan.autoUpgrade,

    lockIncome: currentPlan.lockIncome,

  };

}