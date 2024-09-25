import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import { useReferralStore } from "../store/referralStore";
import { semiShortenAddress } from "../utils/semiShortenAddress";

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
const EditableInput = ({ label, value, isEditing, onChange, onEditToggle, onSubmit, isValid }) => (
  <div className="mt-4">
    <div className="flex justify-between items-center text-black">
      <div>{label}</div>
      <div className="text-gray-500 flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className={`border ${isValid ? "border-gray-300" : "border-red-500"} rounded-md px-2 py-1`}
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
            className={`ml-2 ${isValid ? "text-green-500" : "text-gray-400 cursor-not-allowed"}`}
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

export default function ReferralModal({ isOpen, onClose, onConnect }) {
  const {
    connectedAddress,
    setConnectedAddress,
    telegramUsername,
    setTelegramUsername,
    referrerUsername,
    setReferrerUsername,
  } = useReferralStore();

  const [isEditingYourUsername, setIsEditingYourUsername] = useState(false);
  const [isEditingReferrerUsername, setIsEditingReferrerUsername] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidReferrer, setIsValidReferrer] = useState(true);
  const [loading, setLoading] = useState(false);
  const [referralDetails, setReferralDetails] = useState(null);

  useEffect(() => {
    if (connectedAddress) {
      fetchReferralDetails();
    }
  }, [connectedAddress]);

  const fetchReferralDetails = async () => {
    if (connectedAddress) {
      setLoading(true);
      try {
        const response = await fetch(`/api/referral/${connectedAddress}`);
        const data = await response.json();

        if (response.ok && data.referral) {
          setReferralDetails(data.referral);
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("Error fetching referral details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTelegramUsernameChange = (e) => {
    const value = autoAddAt(e.target.value);
    setTelegramUsername(value);
    setIsValidUsername(validateTelegramUsername(value));
  };

  const handleReferrerUsernameChange = (e) => {
    const value = autoAddAt(e.target.value);
    setReferrerUsername(value);
    setIsValidReferrer(validateTelegramUsername(value));
  };

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
      const submitResponse = await fetch("/api/submit-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(referralData),
      });

      const result = await submitResponse.json();

      if (submitResponse.ok) {
        setIsSubmitted(true);
        fetchReferralDetails();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while submitting the referral.");
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="bg-accent2 p-3 text-center text-black font-bold text-2xl rounded-t-lg">
          Referral Program
        </div>

        <div className="p-5">
          <div className="flex justify-center mt-4">
            <Image
              src="/referral.webp"
              alt="Referral Icon"
              className="w-16 h-16"
              height={64}
              width={64}
            />
          </div>

          {loading ? (
            <div className="text-center mt-4">Loading...</div>
          ) : !connectedAddress ? (
            <div>
              <div className="mt-4 text-center">Connect your wallet to participate in the referral program.</div>
              <button
                onClick={onConnect}
                className="bg-accent text-white font-bold py-2 px-4 mt-4 rounded-lg w-full"
              >
                Connect Wallet
              </button>
            </div>
          ) : isSubmitted ? (
            <div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-black">
                  <div>Wallet Address</div>
                  <div className="text-gray-500">{semiShortenAddress(connectedAddress)}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-black">
                  <div>Your Telegram Username</div>
                  <div className="text-gray-500">{referralDetails?.telegramUsername}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-black">
                  <div>Referrer Username</div>
                  <div className="text-gray-500">{referralDetails?.referrerUsername || "Not set"}</div>
                </div>
              </div>
              {referralDetails?.telegramUsername && (
                <div className="mt-4">
                  <div className="flex w-full">
                    <div className="bg-input rounded-l-md mt-2 p-2 text-black text-center w-full">
                      <input
                        type="text"
                        value={`https://mcfarmers.io/?r=${referralDetails.telegramUsername}`}
                        readOnly
                        className="w-full outline-none bg-input text-black text-center"
                        onClick={(e) => e.currentTarget.select()}
                      />
                    </div>
                    <div
                      className="bg-accent rounded-r-md mt-2 px-4 flex items-center font-bold text-accent2 cursor-pointer select-none text-center"
                      onClick={() => {
                        navigator.clipboard.writeText(`https://mcfarmers.io/?r=${referralDetails.telegramUsername}`);
                        alert("Copied to clipboard!");
                      }}
                    >
                      Copy
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-black">
                  <div>Wallet Address</div>
                  <div className="text-gray-500">{semiShortenAddress(connectedAddress)}</div>
                </div>
              </div>
              <EditableInput
                label="Your Telegram Username"
                value={telegramUsername || ""}
                isEditing={isEditingYourUsername}
                onChange={handleTelegramUsernameChange}
                onEditToggle={() => setIsEditingYourUsername(!isEditingYourUsername)}
                onSubmit={() => setIsEditingYourUsername(false)}
                isValid={isValidUsername}
              />
              <EditableInput
                label="Referrer Username"
                value={referrerUsername || ""}
                isEditing={isEditingReferrerUsername}
                onChange={handleReferrerUsernameChange}
                onEditToggle={() => setIsEditingReferrerUsername(!isEditingReferrerUsername)}
                onSubmit={() => setIsEditingReferrerUsername(false)}
                isValid={isValidReferrer}
              />
              <button
                onClick={handleSubmit}
                className={`bg-accent hover:brightness-110 active:brightness-110 text-white font-bold py-2 w-full mt-5 rounded-lg ${
                  !isValidUsername || !isValidReferrer ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isValidUsername || !isValidReferrer}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="p-3 flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}