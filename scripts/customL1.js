const hre = require("hardhat");

async function main() {
    const L1CustomERC20Gateway = await hre.ethers.getContractFactory("L1CustomERC20Gateway");
    const l1Gateway = await L1CustomERC20Gateway.deploy("0x31C994F2017E71b82fd4D8118F140c81215bbb37");

    await l1Gateway.deployed();

    console.log("customL1 deployed to:", l1Gateway.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
