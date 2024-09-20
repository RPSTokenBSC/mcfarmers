export default function Button({
  children,
  onClick,
  className,
  ...props
}: {
  children: React.ReactNode;
  onClick: (any?: any) => any;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={
        (className || "") +
        ` font-body h-10 px-6 lg:px-8 bg-accent2 border-[1px] border-black text-black flex items-center ` +
        "justify-center font-medium tracking-wider uppercase font-title rounded-lg shadow-md select-none cursor-pointer " +
        "hover:brightness-110 active:brightness-110 active:shadow-lg py-4 text-xl"
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
