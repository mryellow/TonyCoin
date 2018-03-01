const TonyCoin = artifacts.require('TonyCoin');

module.exports = function (deployer, network, accounts) {
  var beneficiary = '0x1a88124f1F338D55396a7d427C8c3ea96cb41e3e';

  var metaCoin;
  if (network == 'live') {
    deployer.then(function () {
      return TonyCoin.deployed();
    }).then(function (instance) {
      metaCoin = instance;
      return metaCoin.mint(beneficiary, 1e+18);
    }).then(function () {
      return metaCoin.finishMinting();
    }).then(function () {
      return metaCoin.transferOwnership(beneficiary);
    });
  } else {
    deployer.then(function () {
      return TonyCoin.deployed();
    }).then(function (instance) {
      metaCoin = instance;
      return metaCoin.mint(accounts[0], 1e+18);
    }).then(function () {
      return metaCoin.finishMinting();
    });
  }

};
