import { create } from "zustand";

export interface StakeBoxData {
  id: string;
  title: string;
  iconSrc: string;
  apr: number;
  timeToUnlock: string;
  amountLocked: number;
  amountEarned: number;
}

interface StakeBoxStore {
  stakeBoxes: { [key: string]: StakeBoxData };
  fetchStakeBoxData: () => Promise<void>;
}

// Simulated blockchain data fetch
const fetchDataFromBlockchain = async (): Promise<StakeBoxData[]> => {
  // In the future, replace this with actual blockchain data fetching
  return [
    {
      id: "mcdonalds-cashier",
      title: "McDonalds Cashier",
      iconSrc: "/icons/cashier.png",
      apr: 29.99,
      timeToUnlock: "next 3 days",
      amountLocked: 200.0,
      amountEarned: 205.0,
    },
    {
      id: "burger-flipper",
      title: "Burger Flipper",
      iconSrc: "/icons/burger.png",
      apr: 89.99,
      timeToUnlock: "next 3 days",
      amountLocked: 200.0,
      amountEarned: 205.0,
    },
    {
      id: "assistant-manager",
      title: "Assistant Manager",
      iconSrc: "/icons/assistant-manager.png",
      apr: 159.99,
      timeToUnlock: "next 3 days",
      amountLocked: 200.0,
      amountEarned: 205.0,
    },
    {
      id: "manager",
      title: "Manager",
      iconSrc: "/icons/manager.png",
      apr: 242.99,
      timeToUnlock: "next 3 days",
      amountLocked: 200.0,
      amountEarned: 205.0,
    },
    {
      id: "the-inbred",
      title: "The Inbred",
      iconSrc: "/icons/inbred.png",
      apr: 420.69,
      timeToUnlock: "next 3 days",
      amountLocked: 200.0,
      amountEarned: 205.0,
    },
  ];
};

export const useStakeBoxStore = create<StakeBoxStore>((set) => ({
  stakeBoxes: {},
  fetchStakeBoxData: async () => {
    const data = await fetchDataFromBlockchain();
    const stakeBoxes = data.reduce((acc, box) => {
      acc[box.id] = box;
      return acc;
    }, {} as { [key: string]: StakeBoxData });
    set({ stakeBoxes });
  },
}));
