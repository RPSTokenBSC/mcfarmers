import { useState } from "react";
import Button from "../components/Button";
import { useReferralStore } from "../store/referralStore"; // Import the Zustand store
import handleConnect from "../utils/handleConnect";
import ReferralModal from "./ReferralModal"; // Adjust the path to the modal

export default function ConnectReferralButton() {
  const {
    connectedAddress,
    setConnectedAddress,
    telegramUsername,
    referrerUsername,
    setTelegramUsername,
    setReferrerUsername,
  } = useReferralStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if all fields are valid (wallet connected, tg username, referrer)
  const isFormValid = connectedAddress && telegramUsername && referrerUsername;

  const handleConnectButton = async () => {
    await handleConnect(setConnectedAddress);
    setIsModalOpen(true); // Show the modal once wallet is connected
  };

  const handleModalSubmit = (tgUsername: string, refUsername: string) => {
    if (tgUsername && refUsername) {
      setTelegramUsername(tgUsername);
      setReferrerUsername(refUsername);
      setIsModalOpen(false); // Close modal only if form is valid
    }
  };

  return (
    <>
      {/* Connect Button Logic */}
      <Button
        onClick={() => {
          if (!connectedAddress || !isFormValid) {
            handleConnectButton();
          }
        }}
        className="absolute top-3 right-5"
      >
        {isFormValid ? "Connected" : "Connect Wallet"}
      </Button>

      {/* Referral Modal */}
      {isModalOpen && (
        <ReferralModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          connectedAddress={connectedAddress}
          onSubmit={handleModalSubmit}
        />
      )}

      {/* Display Referral Info */}
      <div className="mt-5 text-gray-700">
        <p>
          <strong>Wallet Address:</strong> {connectedAddress || "Not connected"}
        </p>
        <p>
          <strong>Your Telegram Username:</strong>{" "}
          {telegramUsername || "Not set"}
        </p>
        <p>
          <strong>Referrer Username:</strong> {referrerUsername || "Not set"}
        </p>
      </div>
    </>
  );
}
