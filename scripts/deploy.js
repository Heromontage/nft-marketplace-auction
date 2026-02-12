const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Deploy NFTCollection
  const NFTCollection = await hre.ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy("AuraVerse", "AURA", 250);
  await nftCollection.waitForDeployment();
  console.log("NFTCollection deployed to:", await nftCollection.getAddress());

  // Deploy NFTMarketplace (2.5% fee)
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await NFTMarketplace.deploy(250);
  await marketplace.waitForDeployment();
  console.log("NFTMarketplace deployed to:", await marketplace.getAddress());

  // Deploy NFTAuction (2.5% fee)
  const NFTAuction = await hre.ethers.getContractFactory("NFTAuction");
  const auction = await NFTAuction.deploy(250);
  await auction.waitForDeployment();
  console.log("NFTAuction deployed to:", await auction.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});