import Image from "next/image";

const TaxItem = ({
  color,
  label,
  percentage,
}: {
  color: string;
  label: string;
  percentage: string;
}) => (
  <div className="flex items-center mb-2">
    <div
      className={`w-4 h-4 rounded-full mr-2`}
      style={{ backgroundColor: color }}
    ></div>
    <span className="text-black">
      {percentage} {label}
    </span>
  </div>
);

const SupplyItem = ({
  color,
  label,
  percentage,
}: {
  color: string;
  label: string;
  percentage: string;
}) => (
  <div className="flex items-center mb-2">
    <div
      className={`w-4 h-4 rounded-full mr-2`}
      style={{ backgroundColor: color }}
    ></div>
    <span className="text-black">
      {percentage} {label}
    </span>
  </div>
);

export default function Tokenomics() {
  return (
    <section className="bg-accent2 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-black">Tokenomics</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/McFarmers.png"
              alt="McFarmers Burger"
              width={300}
              height={300}
              className="mb-8"
            />
            <h3 className="text-2xl font-bold mb-4 text-black">Tax:</h3>
            <TaxItem color="#EF1C00" label="Team Fee" percentage="2%" />
            <TaxItem color="#872300" label="Marketing Fee" percentage="1%" />
            <TaxItem
              color="#EF6100"
              label="Staking Stability"
              percentage="1%"
            />
          </div>
          {/* <div className="w-px h-64 bg-[#FF3131] hidden md:block"></div> */}
          <div className="md:w-1/2">
            <Image
              src="/McFarmers.png"
              alt="McFarmers Logo"
              width={300}
              height={300}
              className="mb-8"
            />
            <h3 className="text-2xl font-bold mb-4 text-black">
              Supply Excluding Staking Supply:
            </h3>
            <SupplyItem
              color="#EF6100"
              label="Private Sale and PreSale"
              percentage="55%"
            />
            <SupplyItem color="#43AD17" label="LP" percentage="40%" />
            <SupplyItem color="#872300" label="Marketing" percentage="4%" />
            <SupplyItem color="#2B0C01" label="Team" percentage="1%" />
          </div>
        </div>
      </div>
    </section>
  );
}
