import { ToastFailed } from "./utils/toast"

export default async function getRoot(contract) {
    if (!contract) {
        ToastFailed("Contract not initialized!")
        return
    }

    const root = await contract.methods.root().call()
    document.getElementById("output").innerText = `Merkle Root: ${root}`
}