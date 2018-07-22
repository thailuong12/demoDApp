var Realestate = artifacts.require("./RealEstate.sol");

module.exports = function(deployer) {
  deployer.deploy(Realestate);
};
