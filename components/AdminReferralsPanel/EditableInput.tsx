interface EditableInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

const EditableInput = ({ value, onChange, isEditing }: EditableInputProps) => {
  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="bg-gray-200 text-black px-2 py-1 w-full"
    />
  ) : (
    <span>{value}</span>
  );
};

export default EditableInput;
