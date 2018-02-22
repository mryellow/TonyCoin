const TonyCoin = artifacts.require('TonyCoin');

module.exports = function (deployer, network, accounts) {
  var cap = 1; // There can be only one
  var heartbeatTimeout = 60 * 60 * 24 * 30 * 3; // 3 Months

  if (network === 'live') {
    // TODO: Deploy EthercraftFarm
    console.log('Live deploy');
    deployer.deploy(TonyCoin, cap, heartbeatTimeout);
  } else {
    console.log('Test deploy');
    deployer.deploy(TonyCoin, cap, heartbeatTimeout);
  }
};
