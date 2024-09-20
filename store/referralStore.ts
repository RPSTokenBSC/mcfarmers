import { create } from "zustand";

interface ReferralState {
  connectedAddress: string | null;
  telegramUsername: string;
  referrerUsername: string;
  setConnectedAddress: (address: string | null) => void;
  setTelegramUsername: (username: string) => void;
  setReferrerUsername: (username: string) => void;
}

export const useReferralStore = create<ReferralState>((set) => ({
  connectedAddress: null,
  telegramUsername: "",
  referrerUsername: "",
  setConnectedAddress: (address) => set({ connectedAddress: address }),
  setTelegramUsername: (username) => set({ telegramUsername: username }),
  setReferrerUsername: (username) => set({ referrerUsername: username }),
}));
