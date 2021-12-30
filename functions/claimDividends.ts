import { CustomWindow } from "../types/window";
import { tokenAddress, tokenContract, web3Instance } from "./config";


async function waitForTxConfirmation(txHash: string) {
    let txReceipt = null;
    while(txReceipt == null) {
      txReceipt = await web3Instance.eth.getTransactionReceipt(txHash);
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  
    if(!txReceipt.status) {
      alert("Transaction failed.");
    }
    return txReceipt.status;
}

export async function claimDividends(address: string): Promise<boolean>{
    try {
        const ethereum = (window as unknown as CustomWindow).ethereum;
        const txData = tokenContract.methods.claimDividend().encodeABI();
        const claimDividendTxParameters = {
            to: tokenAddress,
            from: address,
            value: '0',
            data: txData,
        };

        const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [claimDividendTxParameters],
        });
        
        return (await waitForTxConfirmation(txHash));
    } catch(error){
        if(error instanceof Error && error.message && !error.message.includes('User denied transaction signature')){
            alert(error.message);
        }
        console.log("Error in getResult: ", error);
        return false;
    }
}