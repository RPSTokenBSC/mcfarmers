import Web3 from "web3";
import { AbiItem } from "web3-utils";
import dividendTrackerAbi from "./dividendTrackerAbi.json";
import gameAbi from "./gameAbi.json";
import LpContractAbi from "./LpContractAbi.json";
import tokenAbi from "./tokenAbi.json";

export interface PricingData {
    tokenPrice: string, 
    marketCap: string, 
    circulatingSupply: string, 
    unpaidRewards: string, 
    holdersBalance:  string,
    holdersBalanceInUsd: string,  
    totalRewards: string, 
    totalBettingVolume: number,
    totalBettingVolumeInUsd: string,  
    maxTx: string, 
    buybackBalance: number, 
    buybackBalanceInUsd: string, 
    buyFee: number, 
    sellFee: number, 
    gameTokens: string, 
    // swapThreshold: string
}

export interface TokenToUsd {
    price: string, 
    symbol: string
}

export const tokenAddress = '0xb8CED2c93584C4e228Df25a88dcBe346DF89525D';
export const LpTokenAddress = '0xd0a2976740748da08073777e4b07817bcbdaf4bc';
export const dividendTrackerAddress = '0x2399b0981b0a0f95c50d88361aaf25a60422b516'; 
export const rewardsSymbol = 'BUSD';
export const rewardsDecimals = 18;



const nodeUrl = 'https://bsc-dataseed1.defibit.io/';
export const web3Instance = new Web3(new Web3.providers.HttpProvider(nodeUrl));
export const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase(); 
export const LpTokenContract = new web3Instance.eth.Contract(LpContractAbi as AbiItem[], LpTokenAddress);
export const gameAddress = '0xc8F370DebDc63d260FfFb390cCEE008BE8aab2B8';
export const gameContract = new web3Instance.eth.Contract(gameAbi as AbiItem[], gameAddress);
export const frontendWalletAddress = '0x79288f5681aEe4C21AB9752a48040D506724A85B';


export const tokenContract = new web3Instance.eth.Contract(tokenAbi as AbiItem[], tokenAddress);

export const dividendTrackerContract = new web3Instance.eth.Contract(dividendTrackerAbi as AbiItem[], dividendTrackerAddress);

export const bnbDecimals = 18;
