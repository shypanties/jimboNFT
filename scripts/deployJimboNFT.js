
const hre = require("hardhat");

async function main() {

  const JimboNFT = await hre.ethers.getContractFactory("JimboNFT");
  const jimboNFT = await JimboNFT.deploy();

  await jimboNFT.deployed();

  console.log("Jimbo deployed to:", jimboNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
