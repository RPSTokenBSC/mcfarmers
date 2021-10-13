import { faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commaNumber from "comma-number";
import Head from "next/head";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { web3Instance } from "../functions/config";
import { retrievePricingData } from "../functions/smartContractCall";

export default function Home() {
  // prettier-ignore
  const accentGradient = /*<a className="*/ 'bg-gradient-to-br from-lightbg to-lighterbg'; /* "> */
  //const accentGradient = "";
  /*<a className="*/ ("bg-gradient-to-br from-lightbg to-lighterbg"); /* "> */
  // ------------ DASHBOARD STATES ------------- //

  const [isLoading, setIsLoading] = useState(true);
  const bscAddress = useRef(undefined);

  const [price, setPrice] = useState('0.0000012345658954123');
  const [marketCap, setMarketCap] = useState('0');
  const [circulatingSupply, setCirculatingSupply] = useState('0');
  const [unclaimedRewards, setUnclaimedRewards] = useState('0');
  const [maxTx, setMaxTx] = useState('0');
  const [balance, setBalance] = useState('0');
  const [balanceInUsd, setBalanceInUsd] = useState('0');
  const [totalBettingVolume, setTotalBettingVolume] = useState(0);
  const [totalBettingVolumeInUsd, setTotalBettingVolumeInUsd] = useState('0');
  const [totalRewardsDistributed, setTotalRewardsDistributed] = useState('0');
  const [buybackBalance, setBuybackBalance] = useState(0);
  const [buyBackBalanceInUsd, setBuyBackBalanceInUsd] = useState('0');

  // ------------ FUNCTIONS ------------- //
  // function getPrice(amount: number) {
  //   return (amount * price).toFixed(2);
  // }

  // ------------ ON LOAD ------------- //

  useEffect(() => {
    async function loadData(){
      const pricingData = await retrievePricingData(null);
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
    }
    
    loadData();
    return;
  }, [isLoading]);

  // ------------ ON CLICK ------------- //
  async function handleBscAddress(ref: MutableRefObject<any>) {
    let address;
    try {
      address = web3Instance.utils.toChecksumAddress(ref.current.value);
    } catch {
      alert("Invalid address. Please try again");
      return;
    }
    const isAddress = web3Instance.utils.isAddress(address);
    if(!isAddress) {
        alert("Invalid address. Please try again.");
        return;
    }
    setIsLoading(true);
    
    const pricingData = await retrievePricingData(address);
    setIsLoading(false);
    setPrice(pricingData.tokenPrice);
    setCirculatingSupply(pricingData.circulatingSupply);
    setMarketCap(pricingData.marketCap);
    setTotalBettingVolume(pricingData.totalBettingVolume);
    setTotalBettingVolumeInUsd(pricingData.totalBettingVolumeInUsd)
    setMaxTx(pricingData.maxTx);
    setTotalRewardsDistributed(pricingData.totalRewards);
    setBalance(pricingData.holdersBalance);
    setBalanceInUsd(pricingData.holdersBalanceInUsd);
    setUnclaimedRewards(pricingData.unpaidRewards);
    return;
  }

  return (
    <div
      className={
        (isLoading ? "overflow-hidden" : "overflow-auto") +
        " min-h-screen py-3 px-3 xs:py-10 xs:px-10 xl:px-32 xlish:px-64 2xl:px-80"
      }
      style={{ backgroundImage: 'url("/assets/genericblue.png")' }}
    >
      <div
        className={
          (isLoading ? "flex" : "hidden") +
          " " +
          "absolute h-screen w-full bg-gradient-to-br from-main to-darker flex-col justify-center items-center z-30 left-0 top-0 "
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
        url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans&display=swap);
        /*html, body, #__next { min-height: 100%; height: 100% }*/
        
      `}
        </style>
      </Head>
      <div className="h-full w-full bg-darker rounded-xl shadow-lg px-5 py-10 flex flex-col items-center focus:border-red-500">
        <img
          src="/logo.png"
          alt="Rock Paper Scissors Token (RPST) Logo"
          className="w-64"
        />
        <div className="flex items-center max-w-xl w-full shadow-md mt-5 border-red-500">
          <input
            ref={bscAddress}
            type="text"
            className="w-full bg-main focus:brightness-125 hover:brightness-110 rounded-l-md text-white h-10  px-5 outline-none"
            placeholder="Please paste your BSC address"
          />
          <div
            onClick={() => handleBscAddress(bscAddress)}
            className="h-10 flex items-center justify-center bg-gradient-to-br from-accentlight to-accentdark rounded-r-md px-3 font-semibold font-title pt-1 text-main hover:contrast-150 select-none cursor-pointer"
          >
            Go
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-10 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 font-semibold w-full text-white">
          <div className="bg-main saturate-150 rounded-md px-5 py-3 w-full shadow-md flex flex-wrap">
            <span className="text-gray-300 font-normal">Price:&nbsp;</span>$
            {commaNumber(price)}
          </div>
          <div className="bg-main saturate-150 rounded-md px-5 py-3 w-full shadow-md flex flex-wrap">
            <span className="text-gray-300 font-normal">Market Cap:&nbsp;</span>
            ${commaNumber(marketCap)}
          </div>
          <div className="bg-main saturate-150 rounded-md px-5 py-3 w-full shadow-md flex flex-wrap">
            <span className="text-gray-300 font-normal">
              Circulating Supply:&nbsp;
            </span>

            <span className="text-accentlight">
              {commaNumber(circulatingSupply)} RPST
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 font-semibold w-full text-dollarsDark ">
          <div className="bg-main saturate-150 brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-400 font-medium">Unclaimed rewards:</div>{" "}
            <div className="font-bold text-accentdark">
              {commaNumber(unclaimedRewards)} BUSD
            </div>
            <div className="font-bold">
            </div>
          </div>
          <div className="bg-main saturate-150  brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-400 font-medium">Balance:</div>
            <div className="font-bold text-accentdark">
              {commaNumber(balance)} RPST
            </div>
            <div className="font-bold">${commaNumber(balanceInUsd)}</div>
          </div>
          <div className="bg-main saturate-150 brightness-150  rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-400 font-medium">
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
