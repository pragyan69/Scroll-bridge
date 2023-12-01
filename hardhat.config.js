require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { PRIVATE_KEY } = process.env;

const config = {
  solidity: "0.8.20",
  networks: {
    scrollSepolia: {
      url: 'https://sepolia-rpc.scroll.io',
      accounts: PRIVATE_KEY !== undefined ? [`0x${PRIVATE_KEY}`] : [],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: 'abc',
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
};

module.exports = config;
