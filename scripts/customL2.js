const hre = require("hardhat");

async function main() {
    const L2CustomERC20Gateway = await hre.ethers.getContractFactory("L2CustomERC20Gateway");
    const l2Gateway = await L2CustomERC20Gateway.deploy("0x058dec71E53079F9ED053F3a0bBca877F6f3eAcf");

    await l2Gateway.deployed();

    console.log("L2CustomERC20Gateway deployed to:", l2Gateway.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
