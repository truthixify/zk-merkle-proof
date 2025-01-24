
export default async function getRoot(contract) {
    if (!contract) {
        alert("Contract not initialized!")
        return
    }

    const root = await contract.methods.root().call()
    document.getElementById("output").innerText = `Merkle Root: ${root}`
}