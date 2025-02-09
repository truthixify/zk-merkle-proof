import { ToastSuccess, ToastFailed } from "./utils/toast";

export default async function getHashes(contract) {
  if (!contract) {
    ToastFailed("Contract not initialized!");
    return;
  }

  const hashes = [];
  for (let i = 0; i < 15; i++) {
    const hash = await contract.methods.hashes(i).call();
    hashes.push(hash);
  }

  return hashes;
}
