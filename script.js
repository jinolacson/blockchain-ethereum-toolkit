/**module.exports = function(callback) {
  web3.eth.getBlock('latest').then(console.log)
}**/

const MyContract = artifacts.require("./MyContract.sol");

module.exports = async function(callback) {
  const contract = await MyContract.deployed()
  const value = await contract.get()
  console.log("Value:", value)
}