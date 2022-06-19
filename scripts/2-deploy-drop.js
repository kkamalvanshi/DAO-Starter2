import {AddressZero} from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import {readFileSync} from "fs";

(async() => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "kkDao Membership",
      description: "A DAO for the fans of KK",
      image: readFileSync("scripts/assets/Paulo.png"),
      primary_sale_recipient: AddressZero,
    });

    //address of contract, initializes contract on thirdweb
    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    //gets metadata from editionDrop
    const metadata = await editionDrop.metadata.get();

    console.log("Successfully deployed editionDrop contract, address: ", editionDropAddress,);
    console.log("editionDrop metadata: ", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop", error);
  }
})();

