import axios from "axios";
import {
    bnbDecimals,
    dividendTrackerContract,
    frontendWalletAddress,
    gameContract,
    LpTokenContract,
    PricingData,
    rewardsDecimals,
    tokenAddress,
    tokenContract,
    TokenToUsd,
    WBNB,
    web3Instance
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
    const reserves = await LpTokenContract.methods.getReserves().call();
    const tokenLiquidity = reserves[tokenIdx] / 10**tokenDecimals;
    const bnbLiquidity = reserves[bnbIdx] / 10**bnbDecimals;
    const tokenPrice = ((bnbLiquidity / tokenLiquidity) * bnbPriceInUsd).toFixed(14);
    const circulatingSupply = (await tokenContract.methods.getCirculatingSupply().call()) / 10**tokenDecimals;
    const totalRewards = (await dividendTrackerContract.methods.totalDividends().call()) / 10**rewardsDecimals;
    const maxTx = (await tokenContract.methods._maxTxAmount().call()) / 10**tokenDecimals;
    const winVolume = web3Instance.utils.toBN(
        await gameContract.methods.getWinVolume().call({
            from: frontendWalletAddress
        })
    );
    const lossVolume = web3Instance.utils.toBN(
        await gameContract.methods.getLossVolume().call({
            from: frontendWalletAddress
        })
    );
    const tieVolume = web3Instance.utils.toBN(
        await gameContract.methods.getTieVolume().call({
            from: frontendWalletAddress
        })
    );
    const bnbDivisor = web3Instance.utils.toBN(10**16);
    const totalBettingVolume = ((winVolume.add(lossVolume).add(tieVolume)).div(
        bnbDivisor
    )).toNumber() / 100;
    const buybackBalance = web3Instance.utils.toBN(await web3Instance.eth.getBalance(tokenAddress)).div(
        bnbDivisor
    ).toNumber() / 100;

    const pricingData = {
        tokenPrice: tokenPrice, 
        marketCap:  (circulatingSupply * parseFloat(tokenPrice)).toFixed(0), 
        circulatingSupply: circulatingSupply.toFixed(0), 
        unpaidRewards: unpaidRewards? unpaidRewards.toFixed(0): '0', 
        holdersBalance: holdersBalance? holdersBalance.toFixed(0): '0', 
        holdersBalanceInUsd: holdersBalance? (holdersBalance * parseFloat(tokenPrice)).toFixed(2): '0',  
        totalRewards: totalRewards.toFixed(0), 
        maxTx: maxTx.toFixed(0), 
        totalBettingVolume: totalBettingVolume, 
        totalBettingVolumeInUsd: (totalBettingVolume * bnbPriceInUsd).toFixed(2), 
        buybackBalance: buybackBalance, 
        buybackBalanceInUsd: (buybackBalance * bnbPriceInUsd).toFixed(2)
    };  
    return pricingData;
}
