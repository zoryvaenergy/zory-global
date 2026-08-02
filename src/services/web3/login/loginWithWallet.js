import { ref, get } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";
import { connectWallet } from "../connectWallet";

export async function loginWithWallet() {
  try {
    // Connect Wallet
    const walletResult = await connectWallet();

    if (!walletResult.success) {
      return walletResult;
    }

    const walletAddress = walletResult.walletAddress.toLowerCase();

    // Read Users
    const snapshot = await get(ref(database, "users"));

    if (!snapshot.exists()) {
      return {
        success: false,
        message: "No users found",
      };
    }

    const users = snapshot.val();

    for (const uid in users) {

      const user = users[uid];

     const savedWallet =
  user.wallet?.address ||
  user.walletAddress ||
  "";
      if (
        savedWallet &&
        savedWallet.toLowerCase() === walletAddress
      ) {

        return {
          success: true,
          user,
        };

      }

    }

    return {
      success: false,
      message: "Wallet not registered",
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      message: error.message,
    };

  }
}