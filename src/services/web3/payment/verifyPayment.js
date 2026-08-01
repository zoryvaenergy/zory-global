/**
 * Verify Payment
 * ZORY GLOBAL Web3 Engine
 */

export async function verifyPayment(paymentResult) {

  if (!paymentResult) {

    return {
      success: false,
      message: "Payment data not found",
    };

  }

  if (!paymentResult.success) {

    return {
      success: false,
      message: "Payment failed",
    };

  }

  return {
    success: true,
    message: "Payment verified",
  };

}