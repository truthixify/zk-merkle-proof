import initWallet from './init-wallet.js'
import getRoot from './get-root.js'
import getHashes from './get-hashes.js'
import insertLeaf from './insert-leaf.js'
import verifyProof from './verify.js'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import ellipsify from './utils/ellipsify.js'

async function main() {
    const res = await fetch("/MerkleTree.json")
    const json = await res.json()
    const abi = json.abi
    const contractAddress = "0x30aecC939B5160d0Ec3b86866057E62E1B466EF1"
    let contract

    const connectBtn = document.getElementById("connectWallet")
    const getRootBtn = document.getElementById("getRoot")
    const insertLeafBtn = document.getElementById("insertLeaf")
    const getHashesBtn = document.getElementById("getHashes")
    const verifyProofBtn = document.getElementById("verifyProof")
    const tree = document.getElementById("tree")

    // Event Listeners
    connectBtn.addEventListener("click", async () => {
        contract = await initWallet(abi, contractAddress)
        connectBtn.textContent = "Connected"
    })
    getRootBtn.addEventListener("click", async () => await getRoot(contract))
    insertLeafBtn.addEventListener("click", async () => await insertLeaf(contract))
    getHashesBtn.addEventListener("click", async () => {
        tree.replaceChildren()
        let hashes = await getHashes(contract)
        let len = (hashes.length + 1) / 2
        
        while (len > 0.5) {
            const slice = hashes.slice(0, len)
            hashes = hashes.slice(len, hashes.length)
            const branch = document.createElement("div")
            branch.classList.add("branch")
            
            slice.forEach(s => {
                const leaf = document.createElement("div")
                leaf.classList.add("leaf")
                leaf.textContent = ellipsify(s.toString())

                branch.appendChild(leaf)
            })

            tree.appendChild(branch)

            len = len / 2
        }
    })
    verifyProofBtn.addEventListener("click", async () => await verifyProof(contract))
}

main().then(() => {

}).catch(err => {
    Toastify({
        text: "This is a toast",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
})