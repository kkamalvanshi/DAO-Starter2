import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "kkDao",
      //allows user to only vote using KK token
      voting_token_address:"0x0b2aca0795A3875EA87fB3bBC17aa4939b1B6DDc",
      //when does vote start
      //6570 blocks is 1 day
      vote_delay_in_blocks: 0,
      voting_period_in_blocks: 6570,

      //min % of total supply for proposal to pass
      voting_quorum_fraction: 0,

      //min # of tokens user needs to create proposal
      proposal_token_threshold: 0,
      
      
    });

    console.log("Successfully deployed vote contract, address: ", voteContractAddress,);
  } catch (error) {
    console.error("Failed to deploy vote contract", error);
  }
})();