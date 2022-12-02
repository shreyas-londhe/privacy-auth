import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    gasReporter: {
        enabled: true,
        currency: "USD",
    },
};

export default config;
