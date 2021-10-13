import { faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commaNumber from "comma-number";
import Head from "next/head";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function Home() {
  // prettier-ignore
  const accentGradient = /*<a className="*/ 'bg-gradient-to-br from-lightbg to-lighterbg'; /* "> */
  //const accentGradient = "";
  /*<a className="*/ ("bg-gradient-to-br from-lightbg to-lighterbg"); /* "> */
  // ------------ DASHBOARD STATES ------------- //

  const [isLoading, setIsLoading] = useState(true);
  const bscAddress = useRef(undefined);

  const [price, setPrice] = useState(0.0000012345658954123);
  const [marketCap, setMarketCap] = useState("123321512");
  const [circulatingSupply, setCirculatingSupply] = useState(123321513812);
  const [unclaimedRewards, setUnclaimedRewards] = useState(123567);
  const [rewardsPerCycle, setRewardsPerCycle] = useState(3213112332);
  const [balance, setBalance] = useState(3213112332);
  const [answerToTheUltimateQuestion, setAnswerToTheUltimateQuestion] =
    useState(42);
  const [totalRewardsDistributed, settotalRewardsDistributed] =
    useState(321311233223);
  const [yourRewardsOverTime, setYourRewardsOverTime] = useState(512567989);

  // ------------ FUNCITONS ------------- //
  function getPrice(amount: number) {
    return (amount * price).toFixed(2);
  }

  // ------------ ON LOAD ------------- //

  useEffect(() => {
    const address = window.localStorage.getItem("preferredAddress");
    console.log(address);
    if (
      (typeof address === "string" && address?.length && address !== "null") ||
      (address !== "undefined" && address?.startsWith("0x"))
    ) {
      bscAddress.current.value = address;
    }
    const myTimeout = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(myTimeout);
    };
  }, []);

  // ------------ ON CLICK ------------- //
  function handleBscAddress(ref: MutableRefObject<any>) {
    console.log({ value: ref.current?.value, type: typeof ref.current?.value });
    ref.current?.value?.length && ref?.current?.value?.startsWith("0x")
      ? (alert("Current BSC Address:\n" + ref.current?.value),
        window.localStorage.setItem("preferredAddress", ref.current?.value))
      : alert("Address is empty or doesn't start with 0x.");
  }

  function handleClaimDividend() {
    alert("Claiming dividend.");
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
      <div className="h-full w-full bg-aside rounded-xl shadow-lg px-5 py-10 flex flex-col items-center focus:border-red-500">
        <img
          src="/logo.png"
          alt="Rock Paper Scissors Token (RPST) Logo"
          className="w-64"
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
              {commaNumber(unclaimedRewards)} RPST
            </div>
            <div className="">${commaNumber(getPrice(unclaimedRewards))}</div>
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
            <div className="">${commaNumber(getPrice(balance))}</div>
          </div>
          <div className="bg-elevatedbg saturate-150 brightness-150  rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-300 font-normal">
              Total Rewards Distributed:
            </div>{" "}
            <div className="">
              <div className="text-accentdark font-bold">
                {commaNumber(totalRewardsDistributed)} RPST
              </div>
              ${commaNumber(getPrice(totalRewardsDistributed))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 w-full text-dollarsDark font-medium ">
          <div className="bg-elevatedbg saturate-150 brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-300 font-normal">
              Your rewards over time:
            </div>{" "}
            <div className="">
              <div className="text-accentdark font-bold">
                {commaNumber(yourRewardsOverTime)} RPST
              </div>
              ${commaNumber(getPrice(yourRewardsOverTime))}
            </div>
          </div>
          <div className="bg-elevatedbg saturate-150  brightness-150 rounded-md px-5 py-3 w-full shadow-md font-medium">
            <div className="text-gray-300 font-normal">Rewards per cycle:</div>
            <div className="text-accentdark font-bold">
              {commaNumber(rewardsPerCycle)} RPST
            </div>
            ${commaNumber(getPrice(rewardsPerCycle))}
          </div>
          <div className="bg-elevatedbg saturate-150 brightness-150 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-300 font-normal">
              Answer to the ultimate question:
            </div>{" "}
            <div className="font-bold">
              <div className="text-accentdark">42</div>
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
