import { create } from "zustand";

interface ReferralState {
  connectedAddress: string | null;
  telegramUsername: string;
  referrerUsername: string;
  isAdmin: boolean;
  setConnectedAddress: (address: string | null) => void;
  setTelegramUsername: (username: string) => void;
  setReferrerUsername: (username: string) => void;
  checkAdminStatus: (address: string | null) => void;
}

const adminAddresses = ["0x83abeafe7ba5be9b173149603e13550dcc2ffe57"];

export const useReferralStore = create<ReferralState>((set) => ({
  connectedAddress: null,
  telegramUsername: "",
  referrerUsername: "",
  isAdmin: false,
  setConnectedAddress: (address) => set({ connectedAddress: address }),
  setTelegramUsername: (username) => set({ telegramUsername: username }),
  setReferrerUsername: (username) => set({ referrerUsername: username }),
  checkAdminStatus: (address: string | null) =>
    set({
      isAdmin: adminAddresses.includes(address?.toLowerCase() || ""),
    }),
}));
