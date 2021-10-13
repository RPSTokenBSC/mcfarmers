import axios from "axios";
import {
    bnbDecimals,
    dividendTrackerContract,
    LpTokenContract,
    PricingData,
    rewardsDecimals,
    rewardsSymbol,
    tokenContract,
    TokenToUsd,
    WBNB
} from "./config";

export async function retrievePricingData(userAddress: null | string): Promise<PricingData> {
    let holdersBalance;
    let unpaidRewards;
    const tokenDecimals = await tokenContract.methods.decimals().call();
    if(userAddress){
        // get the unpaid rewards and the balance of the user
        holdersBalance = (await tokenContract.methods.balanceOf(userAddress).call()) / 10**tokenDecimals;
        unpaidRewards = (await dividendTrackerContract.methods.getUnpaidEarnings(userAddress).call()) / 10**rewardsDecimals; //  probably need it to be like balances
    }

    const token0 = (await LpTokenContract.methods.token0().call()).toLowerCase();
    const tokenIdx = token0 == WBNB? 1: 0;
    const bnbIdx = token0 == WBNB? 0: 1;
    const bnbPriceResponse = (await axios.get<TokenToUsd>('https://api.binance.com/api/v3/ticker/price?symbol=BNBBUSD'));
    const bnbPriceInUsd = parseFloat(bnbPriceResponse.data.price);
    const rewardsPriceResponse = (await axios.get<TokenToUsd>('https://api.binance.com/api/v3/ticker/price?symbol=' + rewardsSymbol + 'BUSD'));
    const rewardsInUsd = parseFloat(rewardsPriceResponse.data.price);
    const reserves = await LpTokenContract.methods.getReserves().call();
    const tokenLiquidity = reserves[tokenIdx] / 10**tokenDecimals;
    const bnbLiquidity = reserves[bnbIdx] / 10**bnbDecimals;
    const tokenPrice = ((bnbLiquidity / tokenLiquidity) * bnbPriceInUsd).toFixed(14);
    const circulatingSupply = (await tokenContract.methods.getCirculatingSupply().call()) / 10**tokenDecimals;
    const totalRewards = (await dividendTrackerContract.methods.totalDividends().call()) / 10**rewardsDecimals;
    const totalFees = await tokenContract.methods.totalFee().call();
    const maxTx = (await tokenContract.methods.checkMaxTxAmount().call()) / 10**tokenDecimals;
    const maxWallet = (await tokenContract.methods.checkMaxWalletToken().call()) / 10**tokenDecimals;
    const pricingData = {
        tokenPrice: tokenPrice, 
        marketCap:  (circulatingSupply * parseFloat(tokenPrice)).toFixed(0), 
        circulatingSupply: circulatingSupply.toFixed(0), 
        unpaidRewards: unpaidRewards? unpaidRewards.toFixed(0): '0', 
        unpaidRewardsInUsd: unpaidRewards? (unpaidRewards * rewardsInUsd).toFixed(2): '0', 
        holdersBalance: holdersBalance? holdersBalance.toFixed(0): '0', 
        holdersBalanceInUsd: holdersBalance? (holdersBalance * parseFloat(tokenPrice)).toFixed(2): '0',  
        totalRewards: totalRewards.toFixed(0), 
        totalRewardsInUsd: (totalRewards * rewardsInUsd).toFixed(2), 
        totalFees: totalFees, 
        maxTx: maxTx.toFixed(0), 
        maxWallet: maxWallet.toFixed(0), 
    };  
    return pricingData;
}
