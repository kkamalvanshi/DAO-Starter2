import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote("0x501061848abc38E0008ECa6190eC198c0508A999");

const token = sdk.getToken("0x0b2aca0795A3875EA87fB3bBC17aa4939b1B6DDc");

(async () => {
  try {
    const amount = 420_000;
    const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";

    const executions = [
      {
        //token address executes the mint
        toAddress: token.getAddress(),
        
        //native token is ETH and we don't want to put in eth, just minting new tokens for treasury
        //amount of eth proposal rewards
        //proposal can reward both eth and kk tokens as long as there is enough in trasury
        nativeTokenValue: 0,

        transactionData: token.encoder.encode(
          "mintTo", [
            vote.getAddress(),
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),

        
      }
    ];

    await vote.propose(description, executions);

    console.log("Successfully created proposal to mint tokens");
    
  } catch (error) {
    console.error("failed to create the first proposal", error);
    process.exit(1);
  }

  try {
    //create proposal to award 69000 tokens to me
    const amount = 6_900;
    const description = "Should the DAO transfer " + amount + "tokens from the treasury to " + process.env.WALLET_ADDRESS + " for being awesome?";
    const executions = [
      {
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          "transfer",
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: token.getAddress(),
      },
    ];
    await vote.propose(description, executions);
    console.log("Successfully created proposal to reward myself from the treasury");
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();