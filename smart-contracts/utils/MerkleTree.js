const mimcjs = require("mimcjs-solidity");
const ethers = require("ethers");

class MerkelTree {
    // root stores all the layers
    constructor(leaves) {
        this.root = [];
        this.root.unshift(leaves);
        //   this.root.unshift(leaves.map((t) => t.hash));
        let layerIndex = 0;
        while (this.root[0].length > 1) {
            let temp = [];
            for (let index = 0; index < this.root[0].length; index += 2) {
                if (index < this.root[0].length - 1 && index % 2 == 0)
                    temp.push(
                        mimcjs.mimcHashAny([
                            this.root[0][index],
                            this.root[0][index + 1],
                        ])
                    );
                else temp.push(this.root[0][index]);
            }
            //    console.log("Layer Index while creating tree: " + layerIndex);
            layerIndex++;
            this.root.unshift(temp);
        }
    }

    // Checks if the transaction is valid or not
    verify(leaf) {
        let position = this.root.slice(-1)[0].findIndex((t) => t == leaf);
        // console.log("Element found at: " + position);
        let hash = leaf;
        if (position > -1) {
            for (let index = this.root.length - 1; index > 0; index--) {
                let neighbour = null;
                // console.log("Layer Index while verifying: ", this.root.length - 1 - index);
                if (position % 2 == 0) {
                    neighbour = this.root[index][position + 1];
                    position = Math.floor(position / 2);
                    hash = mimcjs.mimcHashAny([hash, neighbour]);
                } else {
                    neighbour = this.root[index][position - 1];
                    position = Math.floor((position - 1) / 2);
                    hash = mimcjs.mimcHashAny([neighbour, hash]);
                }
                // console.log("neighbour: " + neighbour);
                // console.log("parent: " + hash);
            }
            // console.log(hash == this.root[0][0] ? "Valid" : "Not Valid");
            return hash == this.root[0][0];
        } else {
            console.log("Data not found with the id");
        }
    }

    getProofByIndex(position) {
        let proof = [];
        if (position > -1) {
            for (let index = this.root.length - 1; index > 0; index--) {
                let neighbour = null;
                if (position % 2 == 0) {
                    neighbour = this.root[index][position + 1];
                    position = Math.floor(position / 2);
                    proof.push(neighbour);
                } else {
                    neighbour = this.root[index][position - 1];
                    position = Math.floor((position - 1) / 2);
                    proof.push(neighbour);
                }
            }
            return proof;
        } else {
            return null;
        }
    }

    getProof(leaf) {
        let position = this.root.slice(-1)[0].findIndex((t) => t == leaf);
        return this.getProofByIndex(position);
    }

    getHexProofByIndex(position) {
        let proof = this.getProofByIndex(position);
        if (proof != null) {
            proof = proof.map((t) =>
                ethers.utils.hexZeroPad(
                    ethers.BigNumber.from(t).toHexString(),
                    32
                )
            );
            return proof;
        } else {
            return null;
        }
    }

    getHexProof(leaf) {
        let proof = this.getProof(leaf);
        if (proof != null) {
            proof = proof.map((t) =>
                ethers.utils.hexZeroPad(
                    ethers.BigNumber.from(t).toHexString(),
                    32
                )
            );
            proof.unshift("0x" + BigInt(leaf).toString(16).padStart(64, "0"));
            return proof;
        } else {
            return null;
        }
    }

    getHelper(leaf) {
        let position = this.root.slice(-1)[0].findIndex((t) => t == leaf);
        let helper = [];
        if (position > -1) {
            for (let index = this.root.length - 1; index > 0; index--) {
                if (position % 2 == 0) {
                    position = Math.floor(position / 2);
                    helper.push(1);
                } else {
                    position = Math.floor((position - 1) / 2);
                    helper.push(0);
                }
            }
            return helper;
        } else {
            return null;
        }
    }

    getRoot() {
        return this.root[0][0];
    }

    getHexRoot() {
        return ethers.utils.hexZeroPad(
            ethers.BigNumber.from(this.root[0][0]).toHexString(),
            32
        );
    }
}

module.exports = MerkelTree;
