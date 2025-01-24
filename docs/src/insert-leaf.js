import { Web3 } from "web3";
import { buildPoseidon } from "circomlibjs";

export default async function insertLeaf(contract) {
    if (!contract) {
        alert("Contract not initialized!")
        return
    }

    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const poseidon = await buildPoseidon()
    const hashedLeaf = poseidon([1n])
    const hexString = hashedLeaf.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    const leafBigInt = BigInt("0x" + hexString);
    console.log(BigInt(leafBigInt))
    await contract.methods.insertLeaf(leafBigInt).send({ from: accounts[0] })

    document.getElementById("output").innerText = "Leaf inserted and Merkle root updated!"
}