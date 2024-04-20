const hre = require("hardhat");

async function main() {
  const Pizza = await hre.ethers.getContractFactory("Pizza");
  const contract = await Pizza.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
