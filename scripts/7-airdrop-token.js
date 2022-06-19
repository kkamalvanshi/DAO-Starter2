import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0x94F347B5B96e515D87DC2217Eb59fA1D6Fb2E58B");

const token = sdk.getToken("0x0b2aca0795A3875EA87fB3bBC17aa4939b1B6DDc");

(async () => {
  try {
    //get addresses that have token id of 0
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log("No NFTs have been claimed yet, get some ppl to claim nfts");
      process.exit(0);
    }
    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * (10000-1000+1)+1000);
      console.log("Airdropping", randomAmount, "tokens to", address);
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
      return airdropTarget;
      
    });

    console.log("Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("Successfully airdropped to all Hodlers");
    
  } catch(error) {
    console.error("failed to airdrop tokens", error);
  }
})();