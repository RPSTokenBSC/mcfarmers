import { faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import ReferralBox from "../components/ReferralBox";
import ReferredBox from "../components/ReferredBox"; // Import ReferredBox
import Social from "../components/Social";
import { useConnectAddress } from "../hooks/useConnectedAddress"; // New Hook

export default function Home() {
  const { connectedAddress, connectWallet } = useConnectAddress(); // Using the custom hook
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
  }, [connectedAddress]);

  // If not connected, show referral box with the "Connect Wallet" button
  if (!connectedAddress) {
    return (
      <div
        className={
          " min-h-screen py-3 px-3 xs:py-10 xs:px-10 xl:px-32 xlish:px-64 2xl:px-80 bg-mainbg font-body"
        }
      >
        <Head>
          <title>DASHBOARD | MCFARMERS</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {/* Other head elements */}
        </Head>
        <div className="h-full pb-32 w-full bg-accent rounded-xl shadow-lg px-5 pt-10 pb-4 flex flex-col items-center focus:border-red-500 relative">
          <img
            src="/McFarmers.png"
            alt="MetaSpace Gaming (MSPACE) Logo"
            className="w-64 xs:w-96 mt-10 mb-5"
          />

          {/* Show ReferralBox with Connect Wallet button */}
          <ReferralBox onConnect={connectWallet} />
          {/* <div className="h-10 mt-32 flex text-2xl text-accent2 w-full justify-center space-x-5">
            <Social
              icon={faTwitter}
              link={"https://twitter.com/MetaspaceGaming"}
              name="MetaSpace Twitter Link"
            />
            <Social
              icon={faTelegramPlane}
              link={"https://t.me/MetaspaceGaming"}
              name="MetaSpace Telegram Link"
            />
            <Social
              icon={faLink}
              link={"https://metaspacemoon.com/"}
              name="MetaSpace Website Link"
              smol={true}
            />
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        " min-h-screen py-3 px-3 xs:py-10 xs:px-10 xl:px-32 xlish:px-64 2xl:px-80 bg-mainbg font-body"
      }
    >
      <Head>
        <title>DASHBOARD | MCFARMERS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Other head elements */}
      </Head>
      <div className="h-full w-full bg-accent rounded-xl shadow-lg px-5 pt-10 pb-4 flex flex-col items-center focus:border-red-500 relative">
        <img
          src="/McFarmers.png"
          alt="MetaSpace Gaming (MSPACE) Logo"
          className="w-64 xs:w-96 mt-10 mb-5"
        />

        {/* Show either ReferredBox or ReferralBox based on referral data */}
        {loading ? (
          <div>Loading...</div>
        ) : hasReferralData ? (
          <ReferredBox />
        ) : (
          <ReferralBox />
        )}

        <div className="h-10 mt-32 flex text-2xl text-accent2 w-full justify-center space-x-5">
          <Social
            icon={faTwitter}
            link={"https://twitter.com/MetaspaceGaming"}
            name="MetaSpace Twitter Link"
          />
          <Social
            icon={faTelegramPlane}
            link={"https://t.me/MetaspaceGaming"}
            name="MetaSpace Telegram Link"
          />
          <Social
            icon={faLink}
            link={"https://metaspacemoon.com/"}
            name="MetaSpace Website Link"
            smol={true}
          />
        </div>
      </div>
    </div>
  );
}
