const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const GatewayAddress = "0x058dec71E53079F9ED053F3a0bBca877F6f3eAcf"; // Scroll Custom Gateway address
  const L1TokenAddress = "0x8eB97D63c3DFdf6c51867Ebab934458435369D20"; // The address of your L1 token
  
  const L2Token = await ethers.getContractFactory("L2Token");
  const l2token = await L2Token.deploy(GatewayAddress, L1TokenAddress);

  await l2token.deployed();

  console.log("L2Token deployed to:", l2token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
