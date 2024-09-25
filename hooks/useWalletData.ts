import { useEffect, useState } from 'react';
import { useConnectAddress } from './useConnectedAddress';

interface WalletData {
  walletBalance: string;
  totalStaked: string;
  totalRewards: string;
}

export const useWalletData = (): WalletData => {
  const { connectedAddress } = useConnectAddress();
  const [walletData, setWalletData] = useState<WalletData>({
    walletBalance: '0',
    totalStaked: '0',
    totalRewards: '0',
  });

  useEffect(() => {
    // This is where you'd typically fetch data from the blockchain
    // For now, we'll use mock data
    if (connectedAddress) {
      // Simulate an API call delay
      setTimeout(() => {
        setWalletData({
          walletBalance: '1000.00 McFarm',
          totalStaked: '500.00 McFarm',
          totalRewards: '50.00 McFarm',
        });
      }, 1000);
    } else {
      setWalletData({
        walletBalance: '0',
        totalStaked: '0',
        totalRewards: '0',
      });
    }
  }, [connectedAddress]);

  return walletData;
};