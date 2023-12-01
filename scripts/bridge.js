const hre = require("hardhat");

async function tokenBridgeDemo() {
    // Replace with your contract addresses and amounts
    const l1TokenAddress = "0x8eB97D63c3DFdf6c51867Ebab934458435369D20";
    const l2TokenAddress = "0x84980DB8B8bD15E5E120475E4EE2C90b1B2bF137";
    const l1GatewayAddress = "0x6F294D573Be026c9A134D9200312187Fa767D20B";
    const l2GatewayAddress = "0x6ab81EbC1B1A12d135292D960365d51D183d1673";
    const amountToTransfer = hre.ethers.utils.parseUnits("1", 18); // Example amount

    const L1Token = await hre.ethers.getContractAt("ERC20", l1TokenAddress);
    const L1Gateway = await hre.ethers.getContractAt("L1CustomERC20Gateway", l1GatewayAddress);
    const L2Gateway = await hre.ethers.getContractAt("L2CustomERC20Gateway", l2GatewayAddress);

    // Approve L1 Gateway to spend tokens
    await L1Token.approve(l1GatewayAddress, amountToTransfer);

    // Deposit tokens on L1
    await L1Gateway.depositERC20(l1TokenAddress, amountToTransfer);

    // Wait for bridge process (omitted in this example)
    // ...

    // Withdraw tokens on L2
    await L2Gateway.withdrawERC20(l2TokenAddress, amountToTransfer);

    console.log("Token bridge demonstration completed.");
}

tokenBridgeDemo()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Error in token bridge demo:", error);
        process.exit(1);
    });
