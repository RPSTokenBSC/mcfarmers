import { faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commaNumber from "comma-number";
import Head from "next/head";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import BoxDollars from "../components/BoxDollars";
import BoxTitle from "../components/BoxTitle";
import BoxValue from "../components/BoxValue";
import Button from "../components/Button";
import LightBox from "../components/LightBox";
import Social from "../components/Social";
import { web3Instance } from "../functions/config";
import { retrievePricingData } from "../functions/smartContractCall";
import { CustomWindow } from "../types/window";

function shortenAddress(address: string) {
  const firstPart = address.slice(0, 2);
  const secondPart = address.slice(address.length - 4, address.length);
  return [firstPart, secondPart].join("...");
}

function semiShortenAddress(address: string) {
  const firstPart = address.slice(0, 2);
  const secondPart = address.slice(address.length - 12, address.length);
  return [firstPart, secondPart].join("...");
}

async function logInWithMetamask(
  before: () => void,
  after: () => void,
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
): Promise<string | null> {
  const ethereum = (window as unknown as CustomWindow).ethereum;
  try {
    console.log('bout to run "before"');
    // before();

    await ethereum.request({ method: "eth_requestAccounts" });
    // setTimeout(after, 5000);
    const addy = await ethereum.request({ method: "eth_accounts" });
    setAddress(addy[0]);
    console.log('bout to run "after"');
    // after();
    // console.log({ addy });
    return addy[0];
  } catch (e) {
    // Metamask error. Null means "error, reload window and try again".
    // console.log("breach of construct");
    console.error(e);
    after();
    return null;
  }
}

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState(undefined);
  // ------------ DASHBOARD STATES ------------- //

  const [infoLoadTrigger, setInfoLoadTrigger] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const bscAddress = useRef(undefined);

  const [price, setPrice] = useState("0.0000012345658954123");
  const [marketCap, setMarketCap] = useState("0");
  const [circulatingSupply, setCirculatingSupply] = useState("0");
  const [unclaimedRewards, setUnclaimedRewards] = useState("0");
  const [maxTx, setMaxTx] = useState("0");
  const [balance, setBalance] = useState("0");
  const [balanceInUsd, setBalanceInUsd] = useState("0");
  const [totalBettingVolume, setTotalBettingVolume] = useState(0);
  const [totalBettingVolumeInUsd, setTotalBettingVolumeInUsd] = useState("0");
  const [totalRewardsDistributed, setTotalRewardsDistributed] = useState("0");
  const [buybackBalance, setBuybackBalance] = useState(0);
  const [buyBackBalanceInUsd, setBuyBackBalanceInUsd] = useState("0");

  // ------------ FUNCTIONS ------------- //
  // function getPrice(amount: number) {
  //   return (amount * price).toFixed(2);
  // }
  function triggerInfoLoad() {
    setInfoLoadTrigger(infoLoadTrigger ? 0 : 1);
  }
  function isAddress(address: string): boolean {
    try {
      web3Instance.utils.toChecksumAddress(address);
      return web3Instance.utils.isAddress(address);
    } catch {
      return false;
    }
  }

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      alert("Please connect to MetaMask.");
    } else if (accounts[0] !== connectedAddress) {
      setConnectedAddress(accounts[0]);
      // Do any other work!
    }
  }

  // ------------ ON LOAD ------------- //

  useEffect(() => {
    async function loadData() {
      const address = window.localStorage.getItem("preferredAddress");

      const pricingData = await retrievePricingData(
        isAddress(address) ? address : null
      );
      setIsLoading(false);
      setPrice(pricingData.tokenPrice);
      setCirculatingSupply(pricingData.circulatingSupply);
      setMarketCap(pricingData.marketCap);
      setTotalBettingVolume(pricingData.totalBettingVolume);
      setTotalBettingVolumeInUsd(pricingData.totalBettingVolumeInUsd);
      setMaxTx(pricingData.maxTx);
      setTotalRewardsDistributed(pricingData.totalRewards);
      setBuybackBalance(pricingData.buybackBalance);
      setBuyBackBalanceInUsd(pricingData.buybackBalanceInUsd);
      setBalance(pricingData.holdersBalance);
      setBalanceInUsd(pricingData.holdersBalanceInUsd);
      setBuyBackBalanceInUsd(pricingData.holdersBalanceInUsd);
      setUnclaimedRewards(pricingData.unpaidRewards);
    }

    loadData();
    return;
  }, [infoLoadTrigger]);

  // ------------ ON CLICK ------------- //
  async function handleBscAddress(ref: MutableRefObject<any>) {
    triggerInfoLoad();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const address = ref.current?.value;
    if (!isAddress(address)) {
      alert("Invalid address. Please try again.");
      return;
    }
    setIsLoading(true);
    window.localStorage.setItem("preferredAddress", ref.current?.value);

    const pricingData = await retrievePricingData(address);
    setIsLoading(false);
    setPrice(pricingData.tokenPrice);
    setCirculatingSupply(pricingData.circulatingSupply);
    setMarketCap(pricingData.marketCap);
    setTotalBettingVolume(pricingData.totalBettingVolume);
    setTotalBettingVolumeInUsd(pricingData.totalBettingVolumeInUsd);
    setMaxTx(pricingData.maxTx);
    setTotalRewardsDistributed(pricingData.totalRewards);
    setBalance(pricingData.holdersBalance);
    setBalanceInUsd(pricingData.holdersBalanceInUsd);
    setUnclaimedRewards(pricingData.unpaidRewards);
    return;
  }

  function handleClaimDividend() {
    triggerInfoLoad();
    alert("This feature will be added shortly");
  }

  function handleConnect() {
    return logInWithMetamask(
      () => {
        setIsLoading(true);
      },
      () => {
        setIsLoading(false);
      },
      setConnectedAddress
    );
  }

  return (
    <div
      className={
        (isLoading
          ? "overflow-hidden max-h-screen"
          : "overflow-auto max-h-full") +
        " min-h-screen py-3 px-3 xs:py-10 xs:px-10 xl:px-32 xlish:px-64 2xl:px-80 bg-landscape bg-cover font-body"
      }
      // style={{ backgroundImage: 'url("/assets/genericblue.png")' }}
    >
      <div
        className={
          (isLoading ? "flex" : "hidden") +
          " " +
          "absolute h-screen w-full bg-gradient-to-br from-accentlight to-accentdark flex-col justify-center items-center z-30 left-0 top-0 "
        }
      >
        <img
          src="/loading.svg"
          alt="Loading SVG for NanoShiba token dashboard on BSC"
        />
        <div className="text-2xl text-white font-medium tracking-wide font-title">
          Connecting to blockchain...
        </div>
      </div>
      <Head>
        <title>DASHBOARD | FLIPPER TOKEN</title>
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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <style>
          {`
        @import
        url(https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Open+Sans:wght@400;500;700&display=swap);
        /*html, body, #__next { min-height: 100%; height: 100% }*/
        
      `}
        </style>
      </Head>
      <div className="h-full w-full bg-aside rounded-xl shadow-lg px-5 pt-10 pb-4 flex flex-col items-center focus:border-red-500 relative">
        <Button onClick={handleConnect} className="absolute top-3 right-5">
          {" "}
          {connectedAddress ? shortenAddress(connectedAddress) : "Connect"}{" "}
        </Button>
        <a href="https://www.flipperstoken.com/" target="_blank">
          <img
            src="/assets/logo.svg"
            alt="Rock Paper Scissors Token (FLIP) Logo"
            className="w-64 xs:w-96 mt-10 mb-3"
          />
        </a>
        <div className="flex items-center max-w-xl w-full  mt-5 border-red-500">
          {/* Input to search BSC address */}
          <input
            ref={bscAddress}
            className="w-full border-accentdark text-black px-5 h-10 mr-4 text-lg font-normal tracking-wide text-gray-800 border-2 border-gray-500 rounded-lg focus:outline-none focus:border-red-500 font-title"
            type="text"
            placeholder="Enter BSC address"
          />
          {/* <input
            ref={bscAddress}
            type="text"
            className={
              "w-full bg-[#FFF] border-[3px] border-r-0 border-black  outline-none " +
              " hover:border-accentlight active:border-accentlight focus:border-accentlight text-black h-12  px-5 outline-none shadow-md rounded-none"
            }
            placeholder="Please paste your BSC address"
          /> */}
          <Button onClick={() => handleBscAddress(bscAddress)}>
            <FontAwesomeIcon icon={faSearch} className="text-white h-6 w-6" />
          </Button>
          {/* <button
            className="h-12  w-14  text-white font-medium font-title rounded-none shadow-md hover:contrast-150 select-none cursor-pointer text-xl uppercase tracking-wide flex items-center justify-center bg-gradient-to-br from-accentlight to-accentdark"
            onClick={() => handleBscAddress(bscAddress)}
          >
            Go
          </button> */}
          {/* <div
            onClick={() => handleBscAddress(bscAddress)}
            className="ml-5 h-10 flex items-center justify-center bg-gradient-to-br from-accentlight to-accentdark rounded-r-md px-3 font-medium tracking-wide font-title text-white hover:contrast-150 select-none cursor-pointer text-xl uppercase "
          >
            Go
          </div> */}
        </div>
        <div className="flex flex-col lg:flex-row mt-10 space-x-0 space-y-1 lg:space-y-0 lg:space-x-5 font-semibold w-full text-white">
          <div className="bg-elevatedbg rounded-md px-5 py-3 w-full flex flex-wrap md:justify-start justify-between text-dollars font-medium font-title text-lg tracking-wide">
            <span className="text-accentdark font-normal">Price:&nbsp;</span>$
            {commaNumber(price)}
          </div>
          <div className="bg-elevatedbg rounded-md px-5 py-3 w-full flex flex-wrap md:justify-start justify-between text-dollars font-medium font-title text-lg tracking-wide">
            <span className="text-accentdark font-normal">
              Market Cap:&nbsp;
            </span>
            ${commaNumber(marketCap)}
          </div>
          <div className="bg-elevatedbg rounded-md px-5 py-3 w-full flex flex-wrap md:justify-start justify-between text-dollars font-medium font-title text-lg tracking-wide">
            <span className="text-accentdark font-normal">
              Circulating Supply:&nbsp;
            </span>

            <span className="text-accentlight">
              {commaNumber(circulatingSupply)} FLIP
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 w-full">
          <LightBox>
            <BoxTitle>Unclaimed rewards:</BoxTitle>{" "}
            <BoxValue>{commaNumber(unclaimedRewards)} BUSD</BoxValue>
            <Button onClick={handleClaimDividend} className="mt-2">
              Claim dividend
            </Button>
          </LightBox>
          <LightBox>
            <BoxTitle>Balance:</BoxTitle>
            <BoxValue>{commaNumber(balance)} FLIP</BoxValue>
            <BoxDollars>${commaNumber(balanceInUsd)}</BoxDollars>
          </LightBox>
          <LightBox>
            <BoxTitle>Total Rewards Distributed:</BoxTitle>{" "}
            <BoxValue>{commaNumber(totalRewardsDistributed)} BUSD</BoxValue>
          </LightBox>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 w-full">
          <LightBox highlight={true}>
            <BoxTitle>Total Betting Volume:</BoxTitle>
            <BoxValue>{commaNumber(totalBettingVolume)} FLIP</BoxValue>
            <BoxDollars>${commaNumber(totalBettingVolumeInUsd)}</BoxDollars>
          </LightBox>
          <LightBox highlight={true}>
            <BoxTitle>Buyback balance:</BoxTitle>
            <BoxValue>{commaNumber(buybackBalance)} BNB</BoxValue>
            <BoxDollars>${commaNumber(buyBackBalanceInUsd)}</BoxDollars>
          </LightBox>
          <LightBox highlight={true}>
            <BoxTitle>Max Transaction Amount:</BoxTitle>
            <BoxValue>{commaNumber(maxTx)} FLIP</BoxValue>
          </LightBox>
        </div>
        <div className="h-10 mt-8 flex text-2xl text-accentdark w-full justify-center space-x-5">
          <Social
            icon={faTwitter}
            link={"https://twitter.com/FlipperTokenbsc"}
            name="Flippers Twitter Link"
          />
          <Social
            icon={faTelegramPlane}
            link={"https://t.me/FlipperToken"}
            name="Flippers Telegram Link"
          />
          <Social
            icon={faLink}
            link={"https://flipperstoken.com/"}
            name="Flippers Website Link"
            smol={true}
          />
        </div>
      </div>
    </div>
  );
}
