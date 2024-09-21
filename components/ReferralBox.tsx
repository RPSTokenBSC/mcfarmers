import Image from "next/image";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa"; // Import pencil icon
import { useReferralStore } from "../store/referralStore";
import handleConnect from "../utils/handleConnect";
import { semiShortenAddress } from "../utils/semiShortenAddress";
import ReferredBox from "./ReferredBox"; // Import ReferredBox

// Reusable Editable Input Component
const EditableInput = ({
  label,
  value,
  isEditing,
  onChange,
  onEditToggle,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditToggle: () => void;
}) => (
  <div className="mt-4">
    <div className="flex justify-between items-center text-black">
      <div>{label}</div>
      <div className="text-gray-500 flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        ) : (
          value || "Not set"
        )}
        <button className="ml-2 text-accent" onClick={onEditToggle}>
          <FaPencilAlt />
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

export default function ReferralBox({ onConnect }: { onConnect?: () => void }) {
  const {
    connectedAddress,
    setConnectedAddress,
    telegramUsername,
    setTelegramUsername,
    referrerUsername,
    setReferrerUsername,
  } = useReferralStore();

  // Local state for editing mode and submission
  const [isEditingYourUsername, setIsEditingYourUsername] = useState(false);
  const [isEditingReferrerUsername, setIsEditingReferrerUsername] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks submission state

  // Handlers for connecting the wallet and editing usernames
  const handleConnectWallet = async () => {
    if (onConnect) {
      onConnect(); // Propagate the wallet connection logic from the parent if passed
    } else {
      handleConnect(setConnectedAddress); // Default handling logic
    }
  };

  // Submit the form and switch to ReferredBox after success
  const handleSubmit = async () => {
    if (!connectedAddress || !telegramUsername || !referrerUsername) {
      alert("All fields are required.");
      return;
    }

    const referralData = {
      walletAddress: connectedAddress,
      telegramUsername,
      referrerUsername,
    };

    try {
      const response = await fetch("/api/submit-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(referralData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true); // Mark submission as successful
        console.log("Referral submitted successfully!", result);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while submitting the referral.");
      console.error("Error:", error);
    }
  };

  // If submitted, render ReferredBox
  if (isSubmitted) {
    return <ReferredBox />;
  }

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
              {connectedAddress
                ? semiShortenAddress(connectedAddress)
                : "Not connected"}
            </div>
          </div>
          {!connectedAddress && (
            <ConnectWalletButton onClick={handleConnectWallet} />
          )}
        </div>

        {/* Your Telegram Username (Editable) */}
        <EditableInput
          label="Your Telegram Username"
          value={telegramUsername || ""}
          isEditing={isEditingYourUsername}
          onChange={(e) => setTelegramUsername(e.target.value)}
          onEditToggle={() => setIsEditingYourUsername(!isEditingYourUsername)}
        />

        {/* Referrer Username (Editable) */}
        <EditableInput
          label="Referrer Username"
          value={referrerUsername || ""}
          isEditing={isEditingReferrerUsername}
          onChange={(e) => setReferrerUsername(e.target.value)}
          onEditToggle={() =>
            setIsEditingReferrerUsername(!isEditingReferrerUsername)
          }
        />

        {/* Submit Button */}
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}
