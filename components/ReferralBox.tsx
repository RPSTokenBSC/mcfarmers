import Image from "next/image";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa"; // Import pencil icon
import { useReferralStore } from "../store/referralStore";

// Reusable Label-Value Component with Edit/Add functionality
const LabelValueEditable = ({
  label,
  value,
  isEditable,
  onEdit,
}: {
  label: string;
  value: string;
  isEditable: boolean;
  onEdit: () => void;
}) => (
  <div className="mt-4">
    <div className="flex justify-between items-center text-black">
      <div>{label}</div>
      <div className="text-gray-500 flex items-center">
        {value ? value : "Not set"}
        <button className="ml-2 text-accent" onClick={onEdit}>
          {isEditable ? <FaPencilAlt /> : "Add"}
        </button>
      </div>
    </div>
  </div>
);

// Reusable Button Component for connecting wallet
const ConnectWalletButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="bg-accent text-white font-bold py-2 px-4 mt-2 rounded-lg"
  >
    Connect Wallet
  </button>
);

// Reusable Submit Button
const SubmitButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="bg-accent hover:brightness-110 active:brightness-110 text-white font-bold py-2 w-full mt-5 rounded-lg"
  >
    Submit
  </button>
);

export default function ReferralBox() {
  const {
    connectedAddress,
    setConnectedAddress,
    telegramUsername,
    setTelegramUsername,
    referrerUsername,
    setReferrerUsername,
  } = useReferralStore();

  // Local state to handle editing for Telegram usernames
  const [isEditingYourUsername, setIsEditingYourUsername] = useState(false);
  const [isEditingReferrerUsername, setIsEditingReferrerUsername] =
    useState(false);

  // Handlers for connecting the wallet and editing usernames
  const handleConnectWallet = () => {
    // Logic to connect wallet (MetaMask, etc.)
    console.log("Connect Wallet triggered");
    setConnectedAddress("0x123...abc"); // Simulating connected wallet
  };

  const handleEditTelegramUsername = () => {
    if (isEditingYourUsername) {
      // Save logic here (e.g., open modal or input to get new username)
      const newUsername = prompt(
        "Enter your Telegram username:",
        telegramUsername || ""
      );
      if (newUsername) {
        setTelegramUsername(newUsername);
      }
    }
    setIsEditingYourUsername(!isEditingYourUsername);
  };

  const handleEditReferrerUsername = () => {
    if (isEditingReferrerUsername) {
      // Save logic here (e.g., open modal or input to get referrer username)
      const newReferrer = prompt(
        "Enter referrer Telegram username:",
        referrerUsername || ""
      );
      if (newReferrer) {
        setReferrerUsername(newReferrer);
      }
    }
    setIsEditingReferrerUsername(!isEditingReferrerUsername);
  };

  const handleSubmit = () => {
    console.log("Referral details submitted");
    console.log({
      walletAddress: connectedAddress,
      telegramUsername,
      referrerUsername,
    });
    // Add logic to submit or validate the referral data
  };

  return (
    <div className="rounded-lg shadow-lg w-full max-w-md">
      {/* Top Bar (Yellow) */}
      <div className="bg-accent2 p-3 text-center text-black font-bold text-2xl rounded-t-lg">
        Referral Program
      </div>

      {/* Main Content (White) */}
      <div className="bg-white p-5 rounded-b-lg">
        {/* Icon */}
        <div className="flex justify-center mt-4">
          <Image
            src="/referral.webp" // Replace with your referral icon image
            alt="Referral Icon"
            className="w-16 h-16"
            height={64}
            width={64}
          />
        </div>

        {/* Wallet Address with Connect Button */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-black">
            <div>Wallet Address</div>
            <div className="text-gray-500">
              {connectedAddress ? connectedAddress : "Not connected"}
            </div>
          </div>
          {!connectedAddress && (
            <ConnectWalletButton onClick={handleConnectWallet} />
          )}
        </div>

        {/* Your Telegram Username (Editable) */}
        <LabelValueEditable
          label="Your Telegram Username"
          value={telegramUsername || ""}
          isEditable={telegramUsername !== ""}
          onEdit={handleEditTelegramUsername}
        />

        {/* Referrer Username (Editable) */}
        <LabelValueEditable
          label="Referrer Username"
          value={referrerUsername || ""}
          isEditable={referrerUsername !== ""}
          onEdit={handleEditReferrerUsername}
        />

        {/* Submit Button */}
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}
