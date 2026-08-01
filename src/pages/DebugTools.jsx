import { repairDirectCount } from "../services/team/repairDirectCount";
import { sendPayment } from "../services/web3/payment/sendPayment";

function DebugTools() {

  async function handleRepair() {
    await repairDirectCount();
    alert("Repair Completed");
  }

  async function handlePaymentTest() {
    try {
      await sendPayment();
      alert("Payment Test Completed");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>Debug Tools</h1>

      <button onClick={handleRepair}>
        Repair Direct Count
      </button>

      <button onClick={handlePaymentTest}>
        Test Payment Engine
      </button>
    </div>
  );
}

export default DebugTools;