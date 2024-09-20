interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectedAddress: string | null;
  onSubmit: (tgUsername: string, referrerUsername: string) => void;
}

export default function ReferralModal({
  isOpen,
  onClose,
  connectedAddress,
  onSubmit,
}: ReferralModalProps) {
  const [tgUsername, setTgUsername] = useState("");
  const [referrerUsername, setReferrerUsername] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (tgUsername && referrerUsername) {
      onSubmit(tgUsername, referrerUsername); // Call the onSubmit handler with the username inputs
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Referral Program</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Your Telegram Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={tgUsername}
            onChange={(e) => setTgUsername(e.target.value)}
            placeholder="@yourusername"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">
            Referrer's Telegram Username
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={referrerUsername}
            onChange={(e) => setReferrerUsername(e.target.value)}
            placeholder="@referrerusername"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-accent2 border-[1px] border-black text-black font-medium tracking-wider uppercase font-title rounded-lg shadow-md px-6 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
