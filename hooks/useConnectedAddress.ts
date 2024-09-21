import { useReferralStore } from "../store/referralStore"; // Import the Zustand store
import { CustomWindow } from "../types/window"; // Assuming you have this type defined elsewhere

export const useConnectAddress = () => {
  const { connectedAddress, setConnectedAddress, checkAdminStatus } =
    useReferralStore(); // Zustand store access

  const connectWallet = async (): Promise<string | null> => {
    const ethereum = (window as unknown as CustomWindow).ethereum;
    if (!ethereum) {
      alert("Please install MetaMask");
      return null;
    }

    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const walletAddress = accounts[0];

      setConnectedAddress(walletAddress); // Update Zustand store with connected address
      checkAdminStatus(walletAddress); // Check if connected address is admin
      return walletAddress;
    } catch (e) {
      console.error("Error connecting to MetaMask:", e);
      return null;
    }
  };

  return {
    connectedAddress,
    connectWallet,
  };
};
