import commaNumber from "comma-number";
import Head from "next/head";
import { useState } from "react";
export default function Home() {
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
  function getPrice(amount: number) {
    return (amount * price).toFixed(2);
  }
  return (
    <div className="min-h-screen bg-accentblue py-3 px-3 xs:py-10 xs:px-10 xl:px-32 xlish:px-64 2xl:px-80">
      <Head>
        <title>aaa</title>
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
      <div className="h-full w-full bg-main rounded-xl shadow-lg px-5 py-10 flex flex-col items-center focus:border-red-500">
        <img src="/logo.jpg" alt="NanoShibaInu Logo" className="w-64" />
        <div className="flex items-center max-w-xl w-full shadow-md mt-5 border-red-500">
          <input
            type="text"
            className="w-full bg-white rounded-l-md  h-10 text-black px-5 outline-none"
            placeholder="Please paste your BSC address"
          />
          <div className="h-10 flex items-center justify-center bg-accentred rounded-r-md px-3 font-semibold font-title pt-1 text-dark hover:brightness-125 select-none cursor-pointer">
            Go
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-10 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 font-semibold w-full">
          <div className="bg-lightbg brightness-95 saturate-150 rounded-md px-5 py-3 w-full shadow-md flex flex-wrap">
            <span className="text-gray-600 font-normal">Price:&nbsp;</span>$
            {commaNumber(price)}
          </div>
          <div className="bg-lightbg brightness-95 saturate-150 rounded-md px-5 py-3 w-full shadow-md flex flex-wrap">
            <span className="text-gray-600 font-normal">Market Cap:&nbsp;</span>
            ${commaNumber(marketCap)}
          </div>
          <div className="bg-lightbg brightness-95 saturate-150 rounded-md px-5 py-3 w-full shadow-md flex flex-wrap">
            <span className="text-gray-600 font-normal">
              Circulating Supply:&nbsp;
            </span>

            <span className="text-blue-700">
              {commaNumber(circulatingSupply)} NASHI
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 font-semibold w-full text-green-600 ">
          <div className="bg-lighterbg saturate-150 brightness-125 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-600 font-medium">Unclaimed rewards:</div>{" "}
            <div className="font-bold text-blue-700">
              {commaNumber(unclaimedRewards)} NASHI
            </div>
            <div className="font-bold">
              ${commaNumber(getPrice(unclaimedRewards))}
            </div>
          </div>
          <div className="bg-lighterbg saturate-150  brightness-125 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-600 font-medium">Balance:</div>
            <div className="font-bold text-blue-700">
              {commaNumber(balance)} NASHI
            </div>
            <div className="font-bold">${commaNumber(getPrice(balance))}</div>
          </div>
          <div className="bg-lighterbg saturate-150 rounded-md px-5 brightness-125 py-3 w-full shadow-md">
            <div className="text-gray-600 font-medium">
              Total Rewards Distributed:
            </div>{" "}
            <div className="font-bold">
              <div className="text-blue-700">
                {commaNumber(totalRewardsDistributed)}
              </div>
              ${commaNumber(getPrice(totalRewardsDistributed))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-5 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5 font-semibold w-full text-green-600 ">
          <div className="bg-lighterbg saturate-150 brightness-125 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-600 font-medium">
              Your rewards over time:
            </div>{" "}
            <div className="font-bold">
              <div className="text-blue-700">
                {commaNumber(yourRewardsOverTime)} NASHI
              </div>
              ${commaNumber(getPrice(yourRewardsOverTime))}
            </div>
          </div>
          <div className="bg-lighterbg saturate-150  brightness-125 rounded-md px-5 py-3 w-full shadow-md">
            <div className="text-gray-600 font-medium">Rewards per cycle:</div>
            <div className="text-blue-700 font-bold">
              {commaNumber(rewardsPerCycle)} NASHI
            </div>
            ${commaNumber(getPrice(rewardsPerCycle))}
          </div>
          <div className="bg-lighterbg saturate-150 rounded-md px-5 brightness-125 py-3 w-full shadow-md">
            <div className="text-gray-600 font-medium">
              Answer to the ultimate question:
            </div>{" "}
            <div className="font-bold">
              <div className="text-blue-700">42</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
