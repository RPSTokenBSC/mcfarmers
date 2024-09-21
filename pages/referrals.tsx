import { useEffect, useState } from "react";
import ActionButton from "../components/AdminReferralsPanel/ActionButton";
import ReferralTableRow from "../components/AdminReferralsPanel/ReferralTableRow";
import { useConnectAddress } from "../hooks/useConnectedAddress";
import { useReferralStore } from "../store/referralStore";

interface Referral {
  id: number;
  walletAddress: string;
  telegramUsername: string;
  referrerUsername: string;
}

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReferralId, setEditingReferralId] = useState<number | null>(
    null
  );

  const { connectedAddress, connectWallet } = useConnectAddress(); // Hook for wallet connection
  const { isAdmin } = useReferralStore(); // Zustand store to check admin status

  // Fetch all referrals from the API
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch("/api/referrals");
        const data = await response.json();
        setReferrals(data.referrals);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching referrals:", error);
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchReferrals();
    }
  }, [isAdmin]); // Only fetch referrals if the user is an admin

  const handleEdit = (id: number) => {
    setEditingReferralId(id);
  };

  const handleSave = async (referral: Referral) => {
    try {
      const response = await fetch(`/api/referrals/${referral.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(referral),
      });
      if (response.ok) {
        alert("Referral updated successfully!");
        setEditingReferralId(null); // Stop editing
      } else {
        alert("Error updating referral");
      }
    } catch (error) {
      console.error("Error saving referral:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/referrals/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Referral deleted successfully!");
        setReferrals(referrals.filter((referral) => referral.id !== id)); // Remove deleted referral from state
      } else {
        alert("Error deleting referral");
      }
    } catch (error) {
      console.error("Error deleting referral:", error);
    }
  };

  const handleFieldChange = (id: number, field: string, value: string) => {
    setReferrals((prevReferrals) =>
      prevReferrals.map((referral) =>
        referral.id === id ? { ...referral, [field]: value } : referral
      )
    );
  };

  if (loading && isAdmin) {
    return (
      <p className="p-8 bg-black text-white min-h-screen flex flex-col items-center">
        Loading referrals...
      </p>
    );
  }

  // If the user is not connected, show the "Connect Wallet" button
  if (!connectedAddress) {
    return (
      <div className="p-8 bg-black text-white min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>
        <ActionButton
          label="Connect Wallet"
          onClick={connectWallet}
          color="bg-accent"
        />
        <p className="mt-4">
          You need to connect your wallet to access the admin portal.
        </p>
      </div>
    );
  }

  // If the user is not an admin, show an unauthorized message
  if (connectedAddress && !isAdmin) {
    return (
      <div className="p-8 bg-black text-white min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p className="mt-4">You are not authorized to view this page.</p>
      </div>
    );
  }

  // If the user is an admin, display the referral table
  return (
    <div className="p-8 bg-black text-white min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">All Referrals</h1>

      <p className="mb-4">Connected Address: {connectedAddress}</p>

      <table className="table-auto border-collapse border border-gray">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Wallet Address</th>
            <th className="border border-gray-300 px-4 py-2">
              Telegram Username
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Referrer Username
            </th>
            {isAdmin && (
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral) => (
            <ReferralTableRow
              key={referral.id}
              referral={referral}
              isEditing={editingReferralId === referral.id}
              onEdit={() => handleEdit(referral.id)}
              onSave={() => handleSave(referral)}
              onDelete={() => handleDelete(referral.id)}
              onFieldChange={(field, value) =>
                handleFieldChange(referral.id, field, value)
              }
              isAdmin={isAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
