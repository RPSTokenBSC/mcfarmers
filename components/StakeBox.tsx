import Image from "next/image";
import { useState } from "react";
import { useStakeBoxStore } from "../store/stakeBoxStore";

interface StakeBoxProps {
  id: string;
}

export default function StakeBox({ id }: StakeBoxProps) {
  const stakeBox = useStakeBoxStore((state) => state.stakeBoxes[id]);
  const [stakeAmount, setStakeAmount] = useState(200);
  const [stakeDays, setStakeDays] = useState(4);

  if (!stakeBox) {
    console.log("stakeBoxes", useStakeBoxStore.getState());
    return null; // or some loading state
  }

  const { title, iconSrc, apr, timeToUnlock, amountLocked, amountEarned } =
    stakeBox;

  const handleStake = async () => {
    // Prepare the staking data
    const stakingData = {
      boxId: id,
      amount: stakeAmount,
      days: stakeDays,
      apr: apr,
    };

    console.log("Staking data:", stakingData);

    // Here you would typically interact with MetaMask and send a transaction
    // For now, we'll just log the data
    try {
      // Simulating a blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Staked ${stakeAmount} for ${stakeDays} days with APR ${apr}%`); // stake object
      // You might want to update the UI or state here to reflect the new stake
    } catch (error) {
      console.error("Staking failed:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-72 text-black">
      <div className="bg-accent2 text-black font-bold py-2 px-4 rounded-t-lg">
        {title}
      </div>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="bg-accent rounded-full p-4">
            <Image src={iconSrc} alt={title} width={48} height={48} />
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <span>APR</span>
          <span className="text-accent">Up to {apr}%</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Time till unlock</span>
          <span>{timeToUnlock}</span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col items-center">
            <span className="text-sm">Amount locked</span>
            <span className="font-bold">${amountLocked.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">Amount earned</span>
            <span className="font-bold">${amountEarned.toFixed(2)}</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Stake x days
          </label>
          <div className="flex mt-1">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Number(e.target.value))}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-accent focus:border-accent"
            />
            <select
              value={stakeDays}
              onChange={(e) => setStakeDays(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-accent focus:border-accent"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="w-full bg-accent text-white font-bold py-2 px-4 rounded"
          onClick={handleStake}
        >
          Stake
        </button>
      </div>
    </div>
  );
}
