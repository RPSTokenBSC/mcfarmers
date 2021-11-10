export default function LightBox({
  children,
  highlight,
}: {
  children: any;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        (highlight ? "bg-lightbg" : "bg-bg-[#FFF]") +
        " bg-[#FFF] rounded-md px-5 py-3 w-full shadow-md flex flex-col"
      }
    >
      <div className={highlight && "brightness-75 saturate-150"}>
        {children}
      </div>
    </div>
  );
}
