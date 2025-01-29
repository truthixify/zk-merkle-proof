# ZK Merkle Proof

This project demonstrates a Zero-Knowledge (ZK) Merkle Proof using a Merkle Tree implemented in Solidity, along with a frontend to interact with the smart contract.

## Project Structure

```
.gitignore
artifacts/
contracts/
circuits/
docs/
scripts/
test/
hardhat.config.js
package.json
```

### Key Directories and Files

- **contracts/**: Contains Solidity smart contracts.
  - 

MerkleTree.sol

: Implements the Merkle Tree.
  - 

Poseidon.sol

: Poseidon hash function library.
  - 

verifier.sol

: Verifier contract for ZK proofs.
- **circuits/**: Contains Circom circuits and related files.
  - 

circuit.circom

: Main circuit file.
  - 

MerkleTree.circom

: Merkle Tree circuit.
  - `circuit_js/`: Contains JavaScript files for witness generation.
- **docs/**: Contains frontend files.
  - 

index.html

: Main HTML file.
  - `src/`: Contains JavaScript and CSS files for the frontend.
- **scripts/**: Contains scripts for deploying and compiling contracts.
  - 

deploy.js

: Script to deploy contracts.
  - 

compile-circuit.sh

: Script to compile Circom circuits.
- **test/**: Contains test files.
  - 

merkle-test.js

: Test file for the Merkle Tree contract.
- **hardhat.config.js**: Hardhat configuration file.
- **package.json**: Project dependencies and scripts.

## Prerequisites

- Node.js
- npm
- Hardhat
- Circom
- snarkjs

## Installation

1. Clone the repository:

```sh
git clone https://github.com/truthixify/zk-merkle-proof
cd zk-merkle-proof
```

2. Install dependencies:

```sh
npm install
```

3. Compile the circuits and contracts:

```sh
npm run compile
```

## Running the Project

1. Start the Hardhat node:

```sh
npx hardhat node
```

2. Deploy the contracts:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

3. Start the frontend:

```sh
cd docs
npm install
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`.

## Usage

### Frontend

- **Connect Wallet**: Connect your MetaMask wallet.
- **Insert Leaf**: Insert a new leaf into the Merkle Tree.
- **Get Root**: Retrieve the current Merkle root.
- **Get Hashes**: Retrieve all hashes in the Merkle Tree.
- **Verify Proof**: Verify a Merkle proof.

You can also view a live web UI here: [zk-merkle-proof](https://zk-merkle-proof.pages.dev/)

### Testing

Run the tests using Hardhat:

```sh
npx hardhat test
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Hardhat](https://hardhat.org/)
- [Circom](https://docs.circom.io/)
- [snarkjs](https://github.com/iden3/snarkjs)
- [Toastify](https://apvarun.github.io/toastify-js/)

## Contact

For any inquiries, please contact [truthixify@gmail.com].