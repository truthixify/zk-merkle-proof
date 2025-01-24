import { Web3 } from "web3";

export default async function initWallet(abi, contractAddress) {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' })

            const web3 = new Web3(window.ethereum)
            const accounts = await web3.eth.getAccounts()
            alert(`Connected account: ${accounts[0]}`)

            const contract = new web3.eth.Contract(abi, contractAddress)
            
            return contract
        } catch (error) {
            alert(`Error connecting wallet: ${error}`)
        }
    } else {
        alert('MetaMask is not installed!')
    }
}