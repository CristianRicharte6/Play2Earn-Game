let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

async function connectMetamask() {
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address:", await signer.getAddress());

  const balance = await signer.getBalance();
  const convertToEth = 1e18;
  console.log("account's balance in ether:", balance.toString() / convertToEth);
}

async function claimTokens() {
  const runTokenContractAddress = "0x237aBEE2967805730F2926986C2c0c0878Db8dD5";
  const runTokenContractAbi = [
    "function mintTokens(address account, uint256 amount) public",
  ];
  const runTokenContract = new ethers.Contract(
    runTokenContractAddress,
    runTokenContractAbi,
    provider
  );
  let convertToWei = 1000000000;
  let amountToClaim = window.totalGweiScore * convertToWei;
  await runTokenContract
    .connect(signer)
    .mintTokens(signer.getAddress(), amountToClaim.toString());
}

async function claimNft() {
  const nftContractAddress = "0x65c67ba5307e1AbFAfdFD38905CAE3E5ef6F6c84";
  const mintContractAbi = ["function mint(uint256 amount) public"];
  const nftContract = new ethers.Contract(
    nftContractAddress,
    mintContractAbi,
    provider
  );
  await nftContract.connect(signer).mint(window.totalNFTScore.toString());
}
