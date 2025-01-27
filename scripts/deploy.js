const { poseidonContract } = require("circomlibjs");

async function main() {
  // Fetch the deployer's account (the first account provided by Hardhat's local node)
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const PoseidonT3 = await ethers.getContractFactory(
    poseidonContract.generateABI(2),
    poseidonContract.createCode(2)
  );
  const poseidonT3 = await PoseidonT3.deploy();
  await poseidonT3.deployed();

  const MerkleTree = await ethers.getContractFactory("MerkleTree", {
    libraries: {
      PoseidonT3: poseidonT3.address,
    },
  });

  // Get the contract factory and deploy the contract
  const merkleTree = await MerkleTree.deploy();
  await merkleTree.deployed();

  console.log("Contract deployed to:", merkleTree.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
