const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Create= await hre.ethers.getContractFactory("Create");
  const create = await Create.deploy();

  await create.deployed();

  console.log("Lock with 1 ETH deployed to:", create.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
