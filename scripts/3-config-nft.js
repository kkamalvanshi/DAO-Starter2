import sdk from "./1-initialize-sdk.js";
import {readFileSync} from "fs";

const editionDrop = sdk.getEditionDrop("0x94F347B5B96e515D87DC2217Eb59fA1D6Fb2E58B");
(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Paulo",
        description: "No 🍾, No 💉, Just Free Thoughts. kkDAO Membership",
        image: readFileSync("scripts/assets/Paulo.png"),
      },
    ]);
    console.log("Successfully created new NFT");
  } catch (error) {
    console.error("failed to create new NFT", error);
  }
})();