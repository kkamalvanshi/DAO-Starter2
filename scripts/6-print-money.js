import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x0b2aca0795A3875EA87fB3bBC17aa4939b1B6DDc");

(async() => {
  try {
    const amount = 1;
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();

    console.log("There now is ", totalSupply.displayValue, "$KK in circulation");
  } catch (error) {
    console.log("Failed to print money", error);
  }
})();