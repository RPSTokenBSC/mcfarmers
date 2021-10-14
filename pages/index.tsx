import { faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commaNumber from "comma-number";
import Head from "next/head";
import { MutableRefObject, useEffect, useRef, useState } from "react";
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
    before();

    await ethereum.request({ method: "eth_requestAccounts" });
    const addy = await ethereum.request({ method: "eth_accounts" });
    setAddress(addy[0]);
    console.log('bout to run "after"');
    after();
    // console.log({ addy });
    return addy[0];
  } catch (e) {
    // Metamask error. Null means "error, reload window and try again".
    // console.log("breach of construct");
    return null;
  }
}

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState(undefined);
  // ------------ DASHBOARD STATES ------------- //

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
  }, [isLoading]);

  // ------------ ON CLICK ------------- //
  async function handleBscAddress(ref: MutableRefObject<any>) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const address = ref.current.value;
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
    alert("This feature will be added shortly");
  }

  return (
    <div
      className={
        (isLoading
          ? "overflow-hidden max-h-screen"
          : "overflow-auto max-h-full") +
        " min-h-screen py-3 px-3 xs:py-10 xs:px-10 xl:px-32 xlish:px-64 2xl:px-80 bg-mainbg"
      }
      // style={{ backgroundImage: 'url("/assets/genericblue.png")' }}
    >
      <div
        className={
          (isLoading ? "flex" : "hidden") +
          " " +
          "absolute h-screen w-full bg-gradient-to-br from-mainbg to-darker flex-col justify-center items-center z-30 left-0 top-0 "
        }
      >
        <img
          src="/loading.svg"
          alt="Loading SVG for NanoShiba token dashboard on BSC"
        />
        <div className="text-2xl text-white font-semibold font-title">
          Connecting to blockchain...
        </div>
      </div>
      <Head>
        <title>Dashboard | Rock, Paper, Scissors Token on BSC</title>
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
        url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;500;700&display=swap);
        /*html, body, #__next { min-height: 100%; height: 100% }*/
        
      `}
        </style>
      </Head>
      <div className="h-full w-full bg-aside rounded-xl shadow-lg px-5 py-10 flex flex-col items-center focus:border-red-500 relative">
        <div
          className="absolute top-3 right-5 h-8 px-8 bg-accentdark flex items-center justify-center font-semibold font-title rounded-lg shadow-md select-none cursor-pointer hover:bg-accentlight active:brightness-110 active:shadow-lg"
          onClick={() =>
            logInWithMetamask(
              () => {
                setIsLoading(true);
              },
              () => {
                setIsLoading(false);
              },
              setConnectedAddress
            )
          }
        >
          {connectedAddress ? shortenAddress(connectedAddress) : "Connect"}
        </div>
        <img
          src="/logo.png"
          alt="Rock Paper Scissors Token (RPST) Logo"
          className="w-64 xs:w-96 mt-10 mb-3"
        />
        <div className="flex items-center max-w-xl w-full shadow-md mt-5 border-red-500">
          <input
            ref={bscAddress}
            type="text"
            className={
              "w-full bg-elevatedbg border-l border-t border-b border-gray-700 brightness-75 " +
              "focus:brightness-125 hover:brightness-110 rounded-l-md text-white h-10  px-5 outline-none"
            }
            placeholder="Please paste your BSC address"
          />
          <div
            onClick={() => handleBscAddress(bscAddress)}
            className="h-10 flex items-center justify-center bg-gradient-to-br from-accentlight to-accentdark rounded-r-md px-3 font-semibold font-title pt-1 text-main hover:contrast-150 select-none cursor-pointer"
          >
            Go
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-10 space-x-0 space-y-1 lg:space-y-0 lg:space-x-5 font-semibold w-full text-white">
          <div className="bg-elevatedbg rounded-md px-5 py-3 w-full flex flex-wrap md:justify-start justify-between text-dollars font-medium">
            <span className="text-gray-300 font-medium">Price:&nbsp;</span>$
            {commaNumber(price)}
          </div>
          <div className="bg-elevatedbg rounded-md px-5 py-3 w-full flex flex-wrap md:justify-start justify-between text-dollars font-medium">
            <span className="text-gray-300 font-medium">Market Cap:&nbsp;</span>
            ${commaNumber(marketCap)}
          </div>
          <div className="bg-elevatedbg rounded-md px-5 py-3 w-full flex flex-wrap md:justify-start justify-between text-dollars font-medium">
            <span className="text-gray-300 font-medium">
              Circulating Supply:&nbsp;
            </span>

            <span className="text-accentlight">
              {commaNumber(circulatingSupply)} RPST
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 w-full text-dollarsDark font-medium ">
          <div className="bg-elevatedbg saturate-150 brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-300 font-normal">Unclaimed rewards:</div>{" "}
            <div className="font-bold text-accentdark">
              {commaNumber(unclaimedRewards)} BUSD
            </div>
            <div className=""></div>
            <div
              onClick={handleClaimDividend}
              className="w-full py-1.5 mt-3 font-bold text-lg bg-accentdark brightness-75 hover:brightness-100 select-none hover:cursor-pointer active:saturate-150 text-mainbg flex items-center justify-center rounded-md font-title"
            >
              Claim dividend
            </div>
          </div>
          <div className="bg-elevatedbg saturate-150  brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-300 font-normal">Balance:</div>
            <div className="font-bold text-accentdark">
              {commaNumber(balance)} RPST
            </div>
            <div className="font-bold">${commaNumber(balanceInUsd)}</div>
          </div>
          <div className="bg-elevatedbg saturate-150 brightness-150  rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-300 font-normal">
              Total Rewards Distributed:
            </div>{" "}
            <div className="font-bold">
              <div className="text-accentdark">
                {commaNumber(totalRewardsDistributed)} BUSD
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 font-bold w-full text-dollarsDark ">
          <div className="bg-main saturate-150 brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-400 font-medium">
              Total Betting Volume:
            </div>{" "}
            <div className="font-bold">
              <div className="text-accentdark">
                {commaNumber(totalBettingVolume)} BNB
              </div>
              ${commaNumber(totalBettingVolumeInUsd)}
            </div>
          </div>
          <div className="bg-main saturate-150  brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-400 font-medium">Buyback balance:</div>
            <div className="text-accentdark font-bold">
              {commaNumber(buybackBalance)} BNB
            </div>
            ${commaNumber(buyBackBalanceInUsd)}
          </div>
          <div className="bg-main saturate-150 brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-400 font-medium">
              Max Transaction Amount:
            </div>{" "}
            <div className="font-bold">
              <div className="text-accentdark">{commaNumber(maxTx)} RPST</div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10 mt-8 flex text-2xl text-accentdark w-full justify-center space-x-5">
        <a href="https://twitter.com/RPS_Token" target="_blank">
          <FontAwesomeIcon
            icon={faTwitter}
            className="h-10 hover:brightness-150 hover:saturate-200"
          />
        </a>
        <a href="https://t.me/RPSTOfficial" target="_blank">
          <FontAwesomeIcon
            icon={faTelegramPlane}
            className="h-10 hover:brightness-150 hover:saturate-200"
          />
        </a>
        <a href="https://www.rpstokenbsc.com/" target="_blank">
          <FontAwesomeIcon
            icon={faLink}
            className="h-8 ml-2 mt-1 hover:brightness-150 hover:saturate-200"
          />
        </a>
      </div>
    </div>
  );
}
