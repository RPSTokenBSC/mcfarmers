import Image from "next/image";
import { useEffect, useState } from "react";
import { useReferralStore } from "../store/referralStore";

const LabelValue = ({ label, value }: { label: string; value: string }) => (
  <div className="mt-4">
    <div className="flex justify-between text-sm text-black">
      <div>{label}</div>
      <div className="text-gray-500">{value}</div>
    </div>
  </div>
);

export default function ReferredBox() {
  const { connectedAddress } = useReferralStore();
  const [referralDetails, setReferralDetails] = useState({
    telegramUsername: "",
    referrerUsername: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch referral details for the connected wallet address
  useEffect(() => {
    const fetchReferralDetails = async () => {
      if (connectedAddress) {
        try {
          const response = await fetch(`/api/referral/${connectedAddress}`);
          const data = await response.json();

          if (response.ok && data.referral) {
            const { telegramUsername, referrerUsername } = data.referral;
            setReferralDetails({ telegramUsername, referrerUsername });
          } else {
            console.log("No referral found for this address.");
          }
        } catch (error) {
          console.error("Error fetching referral details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReferralDetails();
  }, [connectedAddress]);

  if (!connectedAddress) {
    return <div>Please connect your wallet to see your referral details.</div>;
  }

  if (loading) {
    return <div>Loading referral details...</div>;
  }

  return (
    <div className="rounded-lg shadow-lg w-full max-w-md">
      {/* Top Bar (Yellow) */}
      <div className="bg-accent2 p-3 text-center text-black font-bold text-2xl rounded-t-lg">
        Referral Submission
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

        {/* Wallet Address */}
        <LabelValue label="Wallet Address" value={connectedAddress} />

        {/* Your Telegram Username */}
        <LabelValue
          label="Your Telegram Username"
          value={referralDetails.telegramUsername || "Not set"}
        />

        {/* Referrer Username */}
        <LabelValue
          label="Referrer Username"
          value={referralDetails.referrerUsername || "Not set"}
        />

        {/* Status Message */}
        <div className="mt-4 text-center text-gray-500">
          Yup, you've already submitted your referral information.
        </div>
      </div>
    </div>
  );
}
