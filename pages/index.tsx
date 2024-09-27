import { useEffect, useState } from "react";
import ActionButton from "../components/AdminReferralsPanel/ActionButton";
import AboutUs from "../components/sections/AboutUs";
import Socials from "../components/sections/Socials";
import Tokenomics from "../components/sections/Tokenomics";
import StakeBox from "../components/StakeBox";
import TopInfoBox from "../components/TopInfoBox";
import { useConnectAddress } from "../hooks/useConnectedAddress"; // New Hook
import { useStakeBoxStore } from "../store/stakeBoxStore";

function Navbar() {
  const { connectedAddress, connectWallet } = useConnectAddress();
  return (
    <nav className="bg-accent h-[154px] px-[142px] py-[26px] flex items-center justify-between">
      <img
        src="/logo-small.png"
        alt="MetaSpace Gaming (MSPACE) Logo"
        className="w-[188px]"
      />
      <div className="flex space-x-12 items-center">
        <a href="#tokenomics" className="text-white text-3xl hover:underline">
          Tokenomics
        </a>
        <a href="#about" className="text-white text-3xl hover:underline">
          About
        </a>
        <a href="#roadmap" className="text-white text-3xl hover:underline">
          Roadmap
        </a>
        {!connectedAddress && (
          <ActionButton label="Connect Wallet" onClick={connectWallet} />
        )}
        {connectedAddress && (
          <ActionButton
            label={
              connectedAddress.slice(0, 6) + "..." + connectedAddress.slice(-4)
            }
            onClick={() => {}}
            // color="bg-purple-500"
          />
        )}
      </div>
    </nav>
  );
}

export default function Home() {
  const { connectedAddress, connectWallet } = useConnectAddress();
  const { fetchStakeBoxData } = useStakeBoxStore();
  const [hasReferralData, setHasReferralData] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check if the user has referral data for their wallet address
  const checkReferralData = async (walletAddress: string) => {
    try {
      const response = await fetch(`/api/referral/${walletAddress}`);
      const data = await response.json();
      if (response.ok && data.referral) {
        console.log({ data });
        setHasReferralData(true);
      }
    } catch (error) {
      console.error("Error fetching referral data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check referral data if the wallet is connected
  useEffect(() => {
    if (connectedAddress) {
      checkReferralData(connectedAddress);
    }
    fetchStakeBoxData();
  }, [connectedAddress]);
  return (
    <div className="min-h-screen bg-mainbg font-body">
      <Navbar />
      <div className="flex justify-center mt-3">
        <TopInfoBox />
      </div>
      <div className="mt-12 flex mx-auto max-w-[1200px] justify-center gap-x-36 gap-y-12 flex-wrap text-white">
        <StakeBox id="mcdonalds-cashier" />
        <StakeBox id="burger-flipper" />
        <StakeBox id="assistant-manager" />
        <StakeBox id="manager" />
        <StakeBox id="the-inbred" />
      </div>
      <AboutUs />
      <Tokenomics />
      <Socials />
    </div>
  );
}
