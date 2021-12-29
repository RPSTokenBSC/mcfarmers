export default function BoxDollars({ children, ...props }) {
  return (
    <div
      className="text-dollars brightness-125 font-body tracking-wide mt-1 text-lg"
      {...props}
    >
      {children}
    </div>
  );
}
