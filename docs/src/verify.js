import { groth16 } from "snarkjs";
import { ToastSuccess, ToastFailed } from "./utils/toast";
import { Web3 } from "web3";

export default async function verifyProof(contract, leaf, index, elements) {
  if (!contract) {
    ToastFailed("Contract not initialized!");
    return;
  }

  const path_elements = [];
  elements
    .trim()
    .split(",")
    .forEach(async (el) => {
      const hashed = await contract.methods.hashes(el.trim()).call();
      path_elements.push(hashed);
    });
  const path_index = index
    .trim()
    .split(",")
    .map((n) => {
        let num = Number(n.trim())
        if (num !== 0 && num !== 1) {
            ToastFailed("Path index must be 0 or 1");
            return
        }

        return num
    });
  const hashedLeaf = await contract.methods.hashes(Number(leaf)).call();

  try {
    const data = {
      leaf: hashedLeaf,
      path_elements,
      path_index,
    };

    const { proof, publicSignals } = await groth16.fullProve(
      data,
      "/circuit.wasm",
      "/circuit_final.zkey"
    );

    const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

    const argv = calldata
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString());

    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const input = argv.slice(8);

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const res = await contract.methods
      .verify(a, b, c, input)
      .send({ from: accounts[0] });

    ToastSuccess("proof successfully verified");
  } catch (err) {
    ToastFailed(err);
  }
}
