const UserIdentity = artifacts.require("UserIdentity");
const BankLoan = artifacts.require("BankLoan");
const InsurancePolicy = artifacts.require("InsurancePolicy");
const ABCRental = artifacts.require("ABCRental");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(UserIdentity);
  const userIdentityInstance = await UserIdentity.deployed();

  console.log(userIdentityInstance.address);

  await deployer.deploy(BankLoan, userIdentityInstance.address);
  await deployer.deploy(InsurancePolicy, userIdentityInstance.address, {from: accounts[3]});
  await deployer.deploy(ABCRental, {from: accounts[6]});
};
