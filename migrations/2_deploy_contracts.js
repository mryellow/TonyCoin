const TonyCoin = artifacts.require('TonyCoin');

module.exports = function (deployer, network, accounts) {
  var beneficiary = '0x1a88124f1F338D55396a7d427C8c3ea96cb41e3e';
  var cap = 1; // There can be only one
  var heartbeatTimeout = 60 * 60 * 24 * 30 * 3; // 3 Months

  if (network === 'live') {
    console.log('Live deploy');
    deployer.deploy(TonyCoin, cap, heartbeatTimeout);

    deployer.then(function () {
      return TonyCoin.deployed();
    }).then(function (instance) {
      instance.mint(beneficiary, 1);
    });
  } else {
    console.log('Test deploy');
    deployer.deploy(TonyCoin, cap, heartbeatTimeout);

    deployer.then(function () {
      return TonyCoin.deployed();
    }).then(function (instance) {
      instance.mint(accounts[1], 1);
    });
  }
};
