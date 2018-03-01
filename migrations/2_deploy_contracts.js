const TonyCoin = artifacts.require('TonyCoin');

module.exports = function (deployer, network, accounts) {
  var cap = 1e+18; // There can be only one

  deployer.deploy(TonyCoin, cap);
};
