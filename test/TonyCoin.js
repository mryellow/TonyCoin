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

  it('has an owner', function () {
    return metaCoin.owner().then(function (res) {
      assert.equal(res, accounts[0], "wasn't first account");
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

  it('should have a balance of 1 in account 0', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (res) {
      assert.equal(res.toNumber(), 1e+18, "1 wasn't the balance");
    });
  });

  it('should have a balance of 0 in account 1', function () {
    return metaCoin.balanceOf.call(accounts[1]).then(function (res) {
      assert.equal(res.toNumber(), 0, "0 wasn't the balance");
    });
  });

  it('should fail attempting to transfer away over half', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (balance) {
      return metaCoin.transfer(accounts[1], balance.toNumber() - (1e+18 / 2));
    }).then(function (res) {
      assert.notEqual(res.receipt.status, 1);
    }).catch(function (err) {
      assert.equal(err, 'Error: VM Exception while processing transaction: revert');
    });
  });

  it('should fail attempting to transfer away over half', function () {
    return metaCoin.approve(accounts[1], 1e+18).then(function () {
      return metaCoin.balanceOf.call(accounts[0]);
    }).then(function (balance) {
      return metaCoin.transferFrom(accounts[0], accounts[1],
        balance.toNumber() - (1e+18 / 2), { from: accounts[1] });
    }).then(function (res) {
      assert.notEqual(res.receipt.status, 1);
    }).catch(function (err) {
      assert.equal(err, 'Error: VM Exception while processing transaction: revert');
    });
  });

  it('should succeed attempting to transfer away under half', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (balance) {
      return metaCoin.transfer(accounts[1], balance.toNumber() - (1e+18 / 2) - 1000);
    }).then(function (res) {
      assert.equal(res.receipt.status, 1);
    });
  });

  it('should succeed attempting to transfer away under half', function () {
    return metaCoin.approve(accounts[1], 1e+18).then(function () {
      return metaCoin.balanceOf.call(accounts[0]);
    }).then(function (balance) {
      return metaCoin.transferFrom(accounts[0], accounts[1],
        balance.toNumber() - (1e+18 / 2) - 500, { from: accounts[1] });
    }).then(function (res) {
      assert.equal(res.receipt.status, 1);
    });
  });

  /*
  it('should fail attempting to transfer over half', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (balance) {
      return metaCoin.transferFrom(accounts[0], accounts[1], balance / 2);
    }).catch(function (err) {
      assert.equal(err, 'Error: VM Exception while processing transaction: revert');
    });
  });

  it('should succeed attempting to transfer under half', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (balance) {
      return metaCoin.transfer(accounts[1], (balance / 2) - 1);
    }).then(function (res) {
      assert.equal(res.receipt.status, 1);
    });
  });

  it('should succeed attempting to transfer under half', function () {
    return metaCoin.balanceOf.call(accounts[0]).then(function (balance) {
      return metaCoin.transferFrom(accounts[0], accounts[1], (balance / 2) - 1)
    }).then(function (res) {
      assert.equal(res.receipt.status, 1);
    });
  });
  */

});
