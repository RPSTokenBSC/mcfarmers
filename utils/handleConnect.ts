import { CustomWindow } from "../types/window";

async function logInWithMetamask(
  before: () => void,
  after: () => void,
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
): Promise<string | null> {
  const ethereum = (window as unknown as CustomWindow).ethereum;
  try {
    console.log('bout to run "before"');
    // before();

    await ethereum.request({ method: "eth_requestAccounts" });
    // setTimeout(after, 5000);
    const addy = await ethereum.request({ method: "eth_accounts" });
    setAddress(addy[0]);
    console.log('bout to run "after"');
    // after();
    // console.log({ addy });
    return addy[0];
  } catch (e) {
    // Metamask error. Null means "error, reload window and try again".
    // console.log("breach of construct");
    console.error(e);
    after();
    return null;
  }
}

// export default async function handleConnect(
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   setConnectedAddress: React.Dispatch<React.SetStateAction<string | null>>
// ) {
//   setIsLoading(true);
//   const address = await logInWithMetamask(
//     () => setIsLoading(true),
//     () => setIsLoading(false),
//     setConnectedAddress
//   );
//   setIsLoading(false);

//   if (!address) {
//     alert("Failed to connect wallet. Please try again.");
//   }
// }

export default async function handleConnect(
  setConnectedAddress: React.Dispatch<React.SetStateAction<string | null>>
) {
  const ethereum = (window as unknown as CustomWindow).ethereum;
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setConnectedAddress(account);
  } catch (error) {
    console.error("MetaMask login failed:", error);
  }
}
