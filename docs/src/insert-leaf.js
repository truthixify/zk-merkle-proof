import { Web3 } from "web3";
import { buildPoseidon } from "circomlibjs";
import { ToastSuccess, ToastFailed } from "./utils/toast";

export default async function insertLeaf(contract, leaf) {
  if (!contract) {
    ToastFailed("Contract not initialized!");
    return;
  }

  try {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const poseidon = await buildPoseidon();
    const hashedLeaf = poseidon([Number(leaf)]);

    const hexString = hashedLeaf
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    const leafBigInt = BigInt("0x" + hexString);

    await contract.methods.insertLeaf(leafBigInt).send({ from: accounts[0] });

    ToastSuccess("Leaf inserted and Merkle root updated!");
  } catch (err) {
    ToastFailed(err);
  }
}
