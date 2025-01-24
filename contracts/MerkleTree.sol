//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { PoseidonT3 } from "./Poseidon.sol"; //an existing library to perform Poseidon hash on solidity
import "./verifier.sol"; //inherits with the MerkleTreeInclusionProof verifier contract

contract MerkleTree is Groth16Verifier {
    uint256[] public hashes; // the Merkle tree in flattened array form
    uint256 public index = 0; // the current index of the first unfilled leaf
    uint256 public root; // the current Merkle root

    constructor() {
        // [assignment] initialize a Merkle tree of 8 with blank leaves
        hashes = new uint256[](15);
        
        _updateRootHash();
    }

    function insertLeaf(uint256 hashedLeaf) public returns (uint256) {
        // [assignment] insert a hashed leaf into the Merkle tree
        require(index < 8, "Merkle tree is full");
        hashes[index++] = hashedLeaf;
        _updateRootHash();
        return root;
    }

    function verify(
            uint256[2] calldata a,
            uint256[2][2] calldata b,
            uint256[2] calldata c,
            uint256[1] calldata input
        ) public view returns (bool) {

        // [assignment] verify an inclusion proof and check that the proof root matches current root
        require(root == input[0], "Proof root does not match current root");
        return verifyProof(a, b, c, input);
    }

    function _updateRootHash() internal {
        for (uint256 i = 8; i < 15; ++i) {
            // Children of node i in this ordering scheme are 2*i-8 and 2*i-7
            hashes[i] = PoseidonT3.poseidon([hashes[2*i - 16], hashes[2*i - 15]]);
        }
        root = hashes[14];
    }
}
