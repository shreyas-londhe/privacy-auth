import { expect } from "chai";
import axios from "axios";
const fs = require("fs");
const mimcjs = require("mimcjs-solidity");
const MerkleTree = require("../utils/MerkleTree.js");
import { ethers } from "hardhat";

describe("Register User Tests", function () {
    let PrivacyAuth: any;

    let userPreimages: any = [];
    let userLeaves: any = [];
    let userTree: any;

    let registerUserSnarkInput: any = {};

    before(async () => {
        for (let i = 0; i < 8; i++) {
            let defaultSlot = "0x" + i.toString(16).padStart(64, "0");
            userPreimages.push(defaultSlot);
            userLeaves.push(mimcjs.mimcHashAny([defaultSlot]).toString());
        }
        userTree = new MerkleTree(userLeaves);

        const VerifierFactory = await ethers.getContractFactory("Verifier");
        const Verifier = await VerifierFactory.deploy();
        await Verifier.deployed();

        const PrivacyAuthFactory = await ethers.getContractFactory(
            "PrivacyAuth"
        );
        PrivacyAuth = await PrivacyAuthFactory.deploy(
            userTree.getHexRoot(),
            Verifier.address
        );
        await PrivacyAuth.deployed();
    });

    it("should register users", async () => {
        for (let i = 0; i < 5; i++) {
            let privateID =
                "0x" +
                Math.floor(Math.random() * 100)
                    .toString(16)
                    .padStart(64, "0");

            registerUserSnarkInput["OldMembersRoot"] = userTree.getHexRoot();
            registerUserSnarkInput["Slot"] = userPreimages[i];

            expect(userLeaves[i]).to.equal(
                mimcjs.mimcHashAny([userPreimages[i]]).toString()
            );
            registerUserSnarkInput["SlotProof"] = userTree.getHexProof(
                userLeaves[i]
            );

            registerUserSnarkInput["SlotHelper"] = userTree.getHelper(
                userLeaves[i]
            );

            registerUserSnarkInput["User"] = {};
            registerUserSnarkInput["User"]["PrivateID"] = privateID;
            userPreimages[i] = privateID;
            userLeaves[i] = mimcjs.mimcHashAny([privateID]).toString();

            userTree = new MerkleTree(userLeaves);
            registerUserSnarkInput["NewMembersRoot"] = userTree.getHexRoot();

            fs.writeFileSync(
                "data/register-user-snark-data.json",
                JSON.stringify(registerUserSnarkInput)
            );

            const url = "http://localhost:6969/";
            const res: any = await axios.post(
                url,
                JSON.stringify(registerUserSnarkInput)
            );

            const registerUserTxn = await PrivacyAuth.registerUser(
                res.data.A,
                res.data.B,
                res.data.C,
                res.data.Input
            );
            await registerUserTxn.wait();
        }
    });
});
