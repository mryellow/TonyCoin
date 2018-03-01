var TonyCoin = artifacts.require('TonyCoin');

contract('TonyCoin', function (accounts) {
  var beneficiary = '0x1a88124f1F338D55396a7d427C8c3ea96cb41e3e';
  var metaCoin;

  var getInstances = function getInstances() {
    const endTime = 50000 * 1e+18; // FIXME: Use `now+`

    return TonyCoin.deployed().then(function (instance) {
      metaCoin = instance;
      return Promise.resolve();
    });
  };

  it('can deploy test instances', function () {
    return getInstances().then(function () {
      assert.isObject(metaCoin);
    });
  });

  it('is not able to accept ETH', function () {
    return metaCoin.sendTransaction({ value: 1e+18, from: accounts[0] }).then(function () {
      return web3.eth.getBalance(metaCoin.address);
    }).catch(function (err) {
      assert.equal(err, 'Error: VM Exception while processing transaction: revert');
    });
  });

  it('has a cap', function () {
    return metaCoin.cap().then(function (res) {
      assert.equal(res.toNumber(), 1e+18, "wasn't 1");
    });
  });

  it('has an heir', function () {
    return metaCoin.heir().then(function (res) {
      assert.equal(res, '0x0000000000000000000000000000000000000000', "wasn't 0x0");
    });
  });

  it('has an owner', function () {
    return metaCoin.owner().then(function (res) {
      assert.equal(res, beneficiary.toLowerCase(), "wasn't second account");
    });
  });

  it('has set mintingFinished', function () {
    return metaCoin.mintingFinished.call().then(function (res) {
      assert.isTrue(res);
    });
  });

  it('should have a name', function () {
    return metaCoin.name.call().then(function (res) {
      assert.equal(res, 'TonyCoin', "TonyCoin wasn't the name");
    });
  });

  it('should have a symbol', function () {
    return metaCoin.symbol.call().then(function (res) {
      assert.equal(res, 'TNY', "TNY wasn't the symbol");
    });
  });

  // Minted during deployment
  it('should have a supply of 1', function () {
    return metaCoin.totalSupply.call().then(function (res) {
      assert.equal(res.toNumber(), 1e+18, "1 wasn't the supply");
    });
  });

  it('should have a balance of 1 in beneficiary', function () {
    return metaCoin.balanceOf.call(beneficiary).then(function (res) {
      assert.equal(res.toNumber(), 1e+18, "1 wasn't the balance");
    });
  });

  it('should have a balance of 0 in account 0', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (res) {
      assert.equal(res.toNumber(), 0, "0 wasn't the balance");
    });
  });

});
