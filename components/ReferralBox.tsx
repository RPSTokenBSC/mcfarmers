import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt } from "react-icons/fa"; // Import pencil and check icons
import { useReferralStore } from "../store/referralStore";
import handleConnect from "../utils/handleConnect";
import { semiShortenAddress } from "../utils/semiShortenAddress";
import ReferredBox from "./ReferredBox";

// Telegram username validation function
const validateTelegramUsername = (username: string): boolean => {
  const telegramRegex = /^@[A-Za-z0-9](?!.*__)[A-Za-z0-9_]{1,30}[A-Za-z0-9]$/;
  return telegramRegex.test(username);
};

// Automatically add "@" if missing and valid
const autoAddAt = (username: string): string => {
  if (username[0] !== "@") {
    return `@${username}`;
  }
  return username;
};

// Reusable Editable Input Component
const EditableInput = ({
  label,
  value,
  isEditing,
  onChange,
  onEditToggle,
  onSubmit,
  isValid,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditToggle: () => void;
  onSubmit: () => void;
  isValid: boolean;
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
            className={`border ${
              isValid ? "border-gray-300" : "border-red-500"
            } rounded-md px-2 py-1`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValid) {
                onSubmit();
              }
            }}
          />
        ) : (
          value || "Not set"
        )}
        {isEditing ? (
          <button
            className={`ml-2 ${
              isValid ? "text-green-500" : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={isValid ? onSubmit : undefined}
            disabled={!isValid}
          >
            <FaCheck />
          </button>
        ) : (
          <button className="ml-2 text-accent" onClick={onEditToggle}>
            <FaPencilAlt />
          </button>
        )}
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
const SubmitButton = ({
  onClick,
  isDisabled,
}: {
  onClick: () => void;
  isDisabled: boolean;
}) => (
  <button
    onClick={onClick}
    className={`bg-accent hover:brightness-110 active:brightness-110 text-white font-bold py-2 w-full mt-5 rounded-lg ${
      isDisabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={isDisabled}
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

  const router = useRouter();
  const [isEditingYourUsername, setIsEditingYourUsername] = useState(false);
  const [isEditingReferrerUsername, setIsEditingReferrerUsername] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false); // Default to false to enforce validation
  const [isValidReferrer, setIsValidReferrer] = useState(true); // Allow for empty referrer initially

  // Handle URL query for referral
  useEffect(() => {
    if (router.query.r) {
      const referrer = autoAddAt(router.query.r as string);
      if (validateTelegramUsername(referrer)) {
        setReferrerUsername(referrer); // Set valid referrer from URL
        setIsValidReferrer(true);
      }
    }
  }, [router.query.r, setReferrerUsername]);

  // Handlers for connecting the wallet and editing usernames
  const handleConnectWallet = async () => {
    if (onConnect) {
      onConnect(); // Propagate the wallet connection logic from the parent if passed
    } else {
      handleConnect(setConnectedAddress); // Default handling logic
    }
  };

  // Validate and auto-correct the Telegram username
  const handleTelegramUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = autoAddAt(e.target.value);
    setTelegramUsername(value);
    setIsValidUsername(validateTelegramUsername(value)); // User's own username must be valid
  };

  const handleReferrerUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = autoAddAt(e.target.value);
    setReferrerUsername(value);
    setIsValidReferrer(validateTelegramUsername(value));
  };

  // Submit the form and check if the wallet has already submitted
  const handleSubmit = async () => {
    if (!connectedAddress || !isValidReferrer || !isValidUsername) {
      alert("Please ensure all fields are valid before submitting.");
      return;
    }

    const referralData = {
      walletAddress: connectedAddress,
      telegramUsername,
      referrerUsername,
    };

    try {
      const response = await fetch(`/api/referral/${connectedAddress}`); // Check if the wallet already exists
      const data = await response.json();

      if (data.exists) {
        alert(
          "You have already submitted your referral. Contact admin if you need changes."
        );
        setIsSubmitted(true);
        return;
      }

      // Proceed with the referral submission
      const submitResponse = await fetch("/api/submit-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(referralData),
      });

      const result = await submitResponse.json();

      if (submitResponse.ok) {
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

        {/* Show inputs only if wallet is connected */}
        {connectedAddress && (
          <>
            {/* Your Telegram Username (Editable) */}
            <EditableInput
              label="Your Telegram Username"
              value={telegramUsername || ""}
              isEditing={isEditingYourUsername}
              onChange={handleTelegramUsernameChange}
              onEditToggle={() =>
                setIsEditingYourUsername(!isEditingYourUsername)
              }
              onSubmit={() => setIsEditingYourUsername(false)}
              isValid={isValidUsername}
            />

            {/* Referrer Username (Editable) */}
            <EditableInput
              label="Referrer Username"
              value={referrerUsername || ""}
              isEditing={isEditingReferrerUsername}
              onChange={handleReferrerUsernameChange}
              onEditToggle={() =>
                setIsEditingReferrerUsername(!isEditingReferrerUsername)
              }
              onSubmit={() => setIsEditingReferrerUsername(false)}
              isValid={isValidReferrer}
            />

            {/* Submit Button */}
            <SubmitButton
              onClick={handleSubmit}
              isDisabled={!isValidUsername || !isValidReferrer}
            />
          </>
        )}
      </div>
    </div>
  );
}
