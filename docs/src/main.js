import initWallet from "./init-wallet.js";
import getRoot from "./get-root.js";
import getHashes from "./get-hashes.js";
import insertLeaf from "./insert-leaf.js";
import verifyProof from "./verify.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ellipsify from "./utils/ellipsify.js";

async function main() {
  const res = await fetch("/MerkleTree.json");
  const json = await res.json();
  const abi = json.abi;
  const contractAddress = "0xc5283F95d9C07bb4a134D01474b242300Eb2436A";
  let contract;

  const connectBtn = document.getElementById("connectWallet");
  const getRootBtn = document.getElementById("getRoot");
  const insertLeafBtn = document.getElementById("insertLeaf");
  const getHashesBtn = document.getElementById("getHashes");
  const verifyProofBtn = document.getElementById("verifyProof");
  const tabInsertBtn = document.querySelector(".tab-insert");
  const tabInsert = document.querySelector(".insert");
  const tabProofBtn = document.querySelector(".tab-proof");
  const tabProof = document.querySelector(".proof");
  const tree = document.getElementById("tree");

  // Event Listeners
  tabInsertBtn.addEventListener("click", () => {
    tabInsertBtn.classList.add("active");
    tabProofBtn.classList.remove("active");
    tabInsert.classList.remove("hidden");
    tabProof.classList.add("hidden");
  });

  tabProofBtn.addEventListener("click", () => {
    tabProofBtn.classList.add("active");
    tabInsertBtn.classList.remove("active");
    tabInsert.classList.add("hidden");
    tabProof.classList.remove("hidden");
  });

  connectBtn.addEventListener("click", async () => {
    contract = await initWallet(abi, contractAddress);
    connectBtn.textContent = "Connected";
  });

  getRootBtn.addEventListener("click", async () => {
    const merkleText = document.querySelector(".merkle-root");

    const merkleRoot = await getRoot(contract);
    merkleText.textContent = "merkle root: " + ellipsify(merkleRoot.toString());
    merkleText.classList.remove("hidden");
  });

  insertLeafBtn.addEventListener("click", async () => {
    const leaf = document.getElementById("insert-leaf").value;
    await insertLeaf(contract, leaf);
  });

  getHashesBtn.addEventListener("click", async () => {
    tree.replaceChildren();
    let hashes = await getHashes(contract);
    let len = (hashes.length + 1) / 2;

    while (len > 0.5) {
      const slice = hashes.slice(0, len);
      hashes = hashes.slice(len, hashes.length);
      const branch = document.createElement("div");
      branch.classList.add("branch");

      slice.forEach((s) => {
        const leaf = document.createElement("div");
        leaf.classList.add("leaf");
        leaf.textContent = ellipsify(s.toString());

        branch.appendChild(leaf);
      });

      tree.appendChild(branch);

      len = len / 2;
    }
  });

  verifyProofBtn.addEventListener("click", async () => {
    const elements = document.getElementById("proof-elements").value;
    const index = document.getElementById("proof-index").value;
    const leaf = document.getElementById("proof-leaf").value;

    await verifyProof(contract, leaf, index, elements);
  });
}

main()
