import Web3 from "web3";
import { AbiItem } from "web3-utils";
import dividendTrackerAbi from "./dividendTrackerAbi.json";
import LpContractAbi from "./LpContractAbi.json";
import tokenAbi from "./tokenAbi.json";

export interface PricingData {
    tokenPrice: string, 
    marketCap: string, 
    circulatingSupply: string, 
    unpaidRewards: string, 
    unpaidRewardsInUsd: string, 
    holdersBalance:  string,
    holdersBalanceInUsd: string,  
    totalRewards: string, 
    totalRewardsInUsd: string, 
    totalFees: number, 
    maxTx: string, 
    maxWallet: string
} 

export interface TokenToUsd {
    price: string, 
    symbol: string
}

export const tokenAddress = '0x8da80544045480bc9e2109c91e9515c4823c5561';
export const LpTokenAddress = '0x3E881D321920DA7D40683c3D23D838Ed573A4f07';
export const dividendTrackerAddress = '0xc9cF5bad238045953b99F99bd49A17E6af3F0d72'; 
export const rewardsSymbol = 'SHIB';
export const rewardsDecimals = 18;



const nodeUrl = 'https://bsc-dataseed1.defibit.io/';
export const web3Instance = new Web3(new Web3.providers.HttpProvider(nodeUrl));
export const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase(); 
export const LpTokenContract = new web3Instance.eth.Contract(LpContractAbi as AbiItem[], LpTokenAddress);


export const tokenContract = new web3Instance.eth.Contract(tokenAbi as AbiItem[], tokenAddress);

export const dividendTrackerContract = new web3Instance.eth.Contract(dividendTrackerAbi as AbiItem[], dividendTrackerAddress);

export const bnbDecimals = 18;
