import { ethers } from "hardhat";
const mimcjs = require("mimcjs-solidity");
const MerkleTree = require("../utils/MerkleTree.js");

async function main() {
    let userPreimages: any = [];
    let userLeaves: any = [];
    let userTree: any;

    for (let i = 0; i < 8; i++) {
        let defaultSlot = "0x" + i.toString(16).padStart(64, "0");
        userPreimages.push(defaultSlot);
        userLeaves.push(mimcjs.mimcHashAny([defaultSlot]).toString());
    }
    userTree = new MerkleTree(userLeaves);

    const VerifierFactory = await ethers.getContractFactory("Verifier");
    const Verifier = await VerifierFactory.deploy();
    await Verifier.deployed();

    const PrivacyAuthFactory = await ethers.getContractFactory("PrivacyAuth");
    const PrivacyAuth = await PrivacyAuthFactory.deploy(
        userTree.getHexRoot(),
        Verifier.address
    );
    await PrivacyAuth.deployed();
    console.log("PrivacyAuth deployed to:", PrivacyAuth.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
