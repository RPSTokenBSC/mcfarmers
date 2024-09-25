import Image from 'next/image';
import { useConnectAddress } from "../hooks/useConnectedAddress";
import { useWalletData } from "../hooks/useWalletData";

export default function TopInfoBox() {
  const { connectedAddress } = useConnectAddress();
  const { walletBalance, totalStaked, totalRewards } = useWalletData();

  return (
    <div className="bg-accent2 rounded-xl shadow-lg p-4 gap-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image src="/referral.webp" alt="MetaMask" width={24} height={24} className='w-10 h-10' />
        <div>
          <div className="text-sm text-black font-semibold">Your wallet:</div>
          <div className="text-black font-bold">{connectedAddress ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}` : 'Not connected'}</div>
        </div>
      </div>
      <div className="bg-black w-px h-[calc(100%-16px)]"></div>
      <div className="flex items-center space-x-4">
        <Image src="/McFarmers.png" alt="USDC" width={24} height={24} />
        <div>
          <div className="text-sm text-black font-semibold">Wallet balance:</div>
          <div className="text-black font-bold">{walletBalance}</div>
        </div>
      </div>
      <div className="bg-black w-px h-[calc(100%-16px)]"></div>
      <div className="flex items-center space-x-4">
      <Image src="/McFarmers.png" alt="USDC" width={24} height={24} />
      <div className="">
        <div className="text-sm text-black font-semibold">Total staked</div>
        <div className="text-black font-bold">{totalStaked}</div></div>
      </div>
      <div className="bg-black w-px h-[calc(100%-16px)]"></div>
      <div className="flex items-center space-x-4">
      <Image src="/McFarmers.png" alt="USDC" width={24} height={24} />
        <div><div className="text-sm text-black font-semibold">Total Rewards:</div>
        <div className="text-black font-bold">{totalRewards}</div></div>
      </div>
    </div>
  );
}