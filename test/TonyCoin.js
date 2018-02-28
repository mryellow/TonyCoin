var TonyCoin = artifacts.require('TonyCoin');

contract('TonyCoin', function (accounts) {
  var metaCoin;

  var getInstances = function getInstances() {
    const endTime = 50000 * 1e18; // FIXME: Use `now+`

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
      assert.equal(res, '1', "wasn't 1");
    });
  });

  it('has an heir', function () {
    return metaCoin.heir().then(function (res) {
      assert.equal(res, '0x0000000000000000000000000000000000000000', "wasn't 0x0");
    });
  });

  it('has an owner', function () {
    return metaCoin.owner().then(function (res) {
      assert.equal(res, accounts[0], "wasn't our account");
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

  it('should have a supply of 1', function () {
    return metaCoin.totalSupply.call().then(function (res) {
      assert.equal(res.toNumber(), 1, "1 wasn't the supply");
    });
  });

  it('should have a balance of 1', function () {
    return metaCoin.balanceOf.call(accounts[1]).then(function (res) {
      assert.equal(res.toNumber(), 1, "1 wasn't the balance");
    });
  });

  it('should have a balance of 0', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (res) {
      assert.equal(res.toNumber(), 0, "0 wasn't the balance");
    });
  });

});
