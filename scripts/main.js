const hre = require("hardhat");

async function setupGateways() {
    // Replace these with the actual deployed addresses
    const l1GatewayAddress = "0x6F294D573Be026c9A134D9200312187Fa767D20B";
    const l2GatewayAddress = "0x6ab81EbC1B1A12d135292D960365d51D183d1673";
    const l1TokenAddress = "0x8eB97D63c3DFdf6c51867Ebab934458435369D20";
    const l2TokenAddress = "0x84980DB8B8bD15E5E120475E4EE2C90b1B2bF137";

    const L1CustomERC20Gateway = await hre.ethers.getContractAt("L1CustomERC20Gateway", l1GatewayAddress);
    const L2CustomERC20Gateway = await hre.ethers.getContractAt("L2CustomERC20Gateway", l2GatewayAddress);

    const gasLimit = hre.ethers.utils.parseUnits("1000000", "wei"); // Example gas limit
    const gasPrice = hre.ethers.utils.parseUnits("10", "gwei");     // Example gas price

    // Initialize L1CustomERC20Gateway with gas settings
    await L1CustomERC20Gateway.initialize(
        l2GatewayAddress,
        "0x13FBE0D0e5552b8c9c4AE9e2435F38f37355998a",
        "0x50c7d3e7f7c656493D1D76aaa1a836CedfCBB16A",
        { gasLimit: gasLimit, gasPrice: gasPrice }
    );

    // Update token mapping in L1CustomERC20Gateway with gas settings
    await L1CustomERC20Gateway.updateTokenMapping(
        l1TokenAddress,
        l2TokenAddress,
        { gasLimit: gasLimit, gasPrice: gasPrice }
    );

    // Initialize L2CustomERC20Gateway with gas settings
    await L2CustomERC20Gateway.initialize(
        l1GatewayAddress,
        "0x9aD3c5617eCAa556d6E166787A97081907171230",
        "0xBa50f5340FB9F3Bd074bD638c9BE13eCB36E603d",
        { gasLimit: gasLimit, gasPrice: gasPrice }
    );

    // Update token mapping in L2CustomERC20Gateway with gas settings
    await L2CustomERC20Gateway.updateTokenMapping(
        l2TokenAddress,
        l1TokenAddress,
        { gasLimit: gasLimit, gasPrice: gasPrice }
    );

    console.log("Gateways have been successfully set up.");
}

setupGateways()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Error in setting up gateways:", error);
        process.exit(1);
    });
