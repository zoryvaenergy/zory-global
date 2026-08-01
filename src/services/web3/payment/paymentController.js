import { sendPayment } from "./sendPayment";
import { verifyTransaction } from "./verifyTransaction";

/**
 * ZORY GLOBAL
 * Payment Controller
 */

export async function paymentController() {

  // Step 1
  const payment = await sendPayment();

  if (!payment.success) {
    return payment;
  }

  // Step 2
  const verified = await verifyTransaction(
    payment.transactionHash
  );

  return verified;

}