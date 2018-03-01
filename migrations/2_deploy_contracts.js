const TonyCoin = artifacts.require('TonyCoin');

module.exports = function (deployer, network, accounts) {
  var cap = 1e+18; // There can be only one
  var heartbeatTimeout = 60 * 60 * 24 * 30 * 3; // 3 Months

  deployer.deploy(TonyCoin, cap, heartbeatTimeout);
};
