const TonyCoin = artifacts.require('TonyCoin');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(TonyCoin);
};
