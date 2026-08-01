import { ref, push, set } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

export async function savePayment(paymentData) {

  const paymentRef = push(
    ref(database, "payments")
  );

  const payment = {

    paymentId: paymentRef.key,

    userId: paymentData.userId,

    walletAddress: paymentData.walletAddress,
    walletProvider: paymentData.walletProvider,

    network: paymentData.network,

chainId: paymentData.chainId,

token: paymentData.token,

amount: paymentData.amount,

    txHash: paymentData.txHash,
    paymentType: paymentData.paymentType,
    status: paymentData.status,

    createdAt: Date.now(),

  };

  await set(paymentRef, payment);

  console.log("Payment Saved :", payment);

  return payment;

}