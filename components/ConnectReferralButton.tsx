import { useState } from "react";
import Button from "../components/Button";
import { useReferralStore } from "../store/referralStore";
import handleConnect from "../utils/handleConnect";
import ReferralModal from "./ReferralModal"; // Import the new ReferralModal

export default function ConnectReferralButton() {
  const {
    connectedAddress,
    setConnectedAddress,
  } = useReferralStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectButton = async () => {
    if (!connectedAddress) {
      await handleConnect(setConnectedAddress);
    }
    setIsModalOpen(true); // Open the modal after connecting or if already connected
  };

  return (
    <>
      {/* Connect Button Logic */}
      <Button
        onClick={handleConnectButton}
        className="absolute top-3 right-5"
      >
        {connectedAddress ? "Open Referral" : "Connect Wallet"}
      </Button>

      {/* Referral Modal */}
      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={() => handleConnect(setConnectedAddress)}
      />
    </>
  );
}