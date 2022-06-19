import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x0b2aca0795A3875EA87fB3bBC17aa4939b1B6DDc");

(async () => {
  try {
    const allRoles = await token.roles.getAll();

    console.log("Roles that exist now: ", allRoles);

    await token.roles.setAll({admin:[],minter:[]});

    console.log("Roles after revoking me", await token.roles.getAll());
    console.log("Successfully revoked powers from ERC 20 contract");

    
  } catch (error) {
    console.errror("Failed to revoke me: ", error);
  }
})();