interface ActionButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const ActionButton = ({ label, onClick, className }: ActionButtonProps) => (
  <button
    onClick={onClick}
    className={`text-black leading-normal  text-3xl border-black border-2 rounded-3xl bg-accent2 py-[10px] px-[26px] ${className}`}
  >
    {label}
  </button>
);

export default ActionButton;
