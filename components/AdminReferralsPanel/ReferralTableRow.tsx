import ActionButton from "./ActionButton";
import EditableInput from "./EditableInput";

interface ReferralTableRowProps {
  referral: {
    id: number;
    walletAddress: string;
    telegramUsername: string;
    referrerUsername: string;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onFieldChange: (field: string, value: string) => void;
  isAdmin: boolean;
}

const ReferralTableRow = ({
  referral,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onFieldChange,
  isAdmin,
}: ReferralTableRowProps) => (
  <tr>
    <td className="border border-gray-300 px-4 py-2">{referral.id}</td>
    <td className="border border-gray-300 px-4 py-2">
      <EditableInput
        value={referral.walletAddress}
        onChange={(e) => onFieldChange("walletAddress", e.target.value)}
        isEditing={isEditing}
      />
    </td>
    <td className="border border-gray-300 px-4 py-2">
      <EditableInput
        value={referral.telegramUsername}
        onChange={(e) => onFieldChange("telegramUsername", e.target.value)}
        isEditing={isEditing}
      />
    </td>
    <td className="border border-gray-300 px-4 py-2">
      <EditableInput
        value={referral.referrerUsername}
        onChange={(e) => onFieldChange("referrerUsername", e.target.value)}
        isEditing={isEditing}
      />
    </td>
    {isAdmin && (
      <td className="border border-gray-300 px-4 py-2">
        {isEditing ? (
          <ActionButton label="Save" onClick={onSave} color="bg-green-500" />
        ) : (
          <ActionButton label="Edit" onClick={onEdit} color="bg-blue-500" />
        )}
        <ActionButton
          label="Delete"
          onClick={onDelete}
          color="bg-red-500"
          className="ml-2"
        />
      </td>
    )}
  </tr>
);

export default ReferralTableRow;
