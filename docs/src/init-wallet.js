import { Web3 } from "web3";
import { ToastSuccess, ToastFailed } from "./utils/toast";
import ellipsify from "./utils/ellipsify";

export default async function initWallet(abi, contractAddress) {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      ToastSuccess(`Connected account: ${ellipsify(accounts[0])}`);

      const contract = new web3.eth.Contract(abi, contractAddress);

      return contract;
    } catch (error) {
      ToastFailed(`Error connecting wallet: ${error}`);
    }
  } else {
    ToastFailed("MetaMask is not installed!");
  }
}
