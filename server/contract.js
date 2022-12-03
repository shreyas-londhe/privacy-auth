const ethers = require("ethers");
const mimcjs = require("mimcjs-solidity");
const MerkleTree = require("./MerkleTree.js");
require("dotenv").config();

let userTree;
let userLeaves = [];
let userPreimages = [];
let contractAddress = process.env.CONTRACT_ADDRESS;

let contractABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_initialMembersRoot",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_verifier",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "membersRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numUsersRegistered",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "_a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "_b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "_c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[3]",
        name: "_publicInputs",
        type: "uint256[3]",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "_a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "_b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "_c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[1]",
        name: "_publicInputs",
        type: "uint256[1]",
      },
    ],
    name: "verifyMember",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
];

let PrivacyAuth;

let provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);

let ownerSigner = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

function generateInitialTree() {
  for (let i = 0; i < 8; i++) {
    let defaultSlot = "0x" + i.toString(16).padStart(64, "0");
    userPreimages.push(defaultSlot);
    userLeaves.push(mimcjs.mimcHashAny([defaultSlot]).toString());
  }
  userTree = new MerkleTree(userLeaves);
}

function getContractInstance() {
  PrivacyAuth = new ethers.Contract(contractAddress, contractABI, provider);
}

async function getCurrentMemberRoot() {
  console.log("Getting current member root");
  console.log(await PrivacyAuth.membersRoot());
  console.log(userTree.getHexRoot());
  return await PrivacyAuth.membersRoot();
}

function generateUserRegistrationSnarkData(privateID) {
  registerUserSnarkInput["OldMembersRoot"] = userTree.getHexRoot();

  //TODO to fetch current slot from the contract
  var currentSlot = 0;
  registerUserSnarkInput["Slot"] = userPreimages[currentSlot];

  registerUserSnarkInput["SlotProof"] = userTree.getHexProof(
    userLeaves[currentSlot]
  );

  registerUserSnarkInput["SlotHelper"] = userTree.getHelper(
    userLeaves[currentSlot]
  );

  registerUserSnarkInput["User"] = {};
  registerUserSnarkInput["User"]["PrivateID"] = privateID;
  userPreimages[currentSlot] = privateID;
  userLeaves[currentSlot] = mimcjs.mimcHashAny([privateID]).toString();

  userTree = new MerkleTree(userLeaves);
  registerUserSnarkInput["NewMembersRoot"] = userTree.getHexRoot();
}

module.exports = {
  generateInitialTree,
  generateUserRegistrationSnarkData,
  getContractInstance,
  getCurrentMemberRoot,
};
