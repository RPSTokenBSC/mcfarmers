interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color: string; // E.g. "bg-blue-500", "bg-green-500", etc.
  className?: string;
}

const ActionButton = ({
  label,
  onClick,
  color,
  className,
}: ActionButtonProps) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-4 py-1 rounded ${className}`}
  >
    {label}
  </button>
);

export default ActionButton;
