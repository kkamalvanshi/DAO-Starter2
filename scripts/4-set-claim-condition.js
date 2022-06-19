import sdk from "./1-initialize-sdk.js";
import {MaxUint256} from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x94F347B5B96e515D87DC2217Eb59fA1D6Fb2E58B");

(async () => {
  try {
    const claimConditions = [{
      startTime: new Date(),
      maxQuantity: 50_000,
      price: 0,
      quantityLimitPerTreansaction:1,
      waitInSeconds: MaxUint256,
    }]
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("Successfully set claim conditions");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();