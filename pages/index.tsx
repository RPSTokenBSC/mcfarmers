import { faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import React from "react";
import ReferralBox from "../components/ReferralBox";
import Social from "../components/Social";
import { CustomWindow } from "../types/window";

async function logInWithMetamask(
  before: () => void,
  after: () => void,
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
): Promise<string | null> {
  const ethereum = (window as unknown as CustomWindow).ethereum;
  try {
    console.log('bout to run "before"');
    await ethereum.request({ method: "eth_requestAccounts" });
    const addy = await ethereum.request({ method: "eth_accounts" });
    setAddress(addy[0]);
    console.log('bout to run "after"');
    return addy[0];
  } catch (e) {
    console.error(e);
    after();
    return null;
  }
}

export default function Home() {
  return (
    <div
      className={
        " min-h-screen py-3 px-3 xs:py-10 xs:px-10 xl:px-32 xlish:px-64 2xl:px-80 bg-mainbg font-body"
      }
    >
      <Head>
        <title>DASHBOARD | METASPACE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#300E63" />
        <meta name="msapplication-TileColor" content="#300e63" />
        <meta name="theme-color" content="#300e63" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="crossOrigin"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');`}
        </style>
      </Head>
      <div className="h-full w-full bg-accent rounded-xl shadow-lg px-5 pt-10 pb-4 flex flex-col items-center focus:border-red-500 relative">
        <img
          src="/McFarmers.png"
          alt="MetaSpace Gaming (MSPACE) Logo"
          className="w-64 xs:w-96 mt-10 mb-5"
        />
        {}

        <ReferralBox />
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
