export default function BoxDollars({ children, ...props }) {
  return (
    <div
      className="text-dollarsDark font-title tracking-wide mt-1 text-lg"
      {...props}
    >
      {children}
    </div>
  );
}
