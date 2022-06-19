import sdk from "./1-initialize-sdk.js";

//governance contract
const vote = sdk.getVote("0x501061848abc38E0008ECa6190eC198c0508A999");

//erc20 contract
const token = sdk.getToken("0x0b2aca0795A3875EA87fB3bBC17aa4939b1B6DDc");

(async () => {
  try {
    //give treasury additional power to mint token if needed
    await token.roles.grant("minter", vote.getAddress());

    console.log("Successfully gave vote contract permissions to act on token contract")
  } catch (error) {
    console.error("failed to grant vote contract permissions on token contract", error);
    process.exit(1);
  }

  try {
    //get wallet's token balance
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    const ownedAmount = ownedTokenBalance.displayValue;

    //getting 90 percent of token balance
    const percent90 = Number(ownedAmount) / 100 * 90;

    //transfer 90 percent of voting contract
    await token.transfer(
      vote.getAddress(),
      percent90
    );

    console.log("Sucessfully transferred " + percent90 + " tokens to vote contract");
  } catch (error) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();