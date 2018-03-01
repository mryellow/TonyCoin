require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3();
const WalletProvider = require('truffle-wallet-provider');
const Wallet = require('ethereumjs-wallet');

var mainNetPrivateKey;
var mainNetWallet;
var mainNetProvider;
if (process.env.MAINNET_PRIVATE_KEY) {
  mainNetPrivateKey = new Buffer(process.env.MAINNET_PRIVATE_KEY, 'hex');
  mainNetWallet = Wallet.fromPrivateKey(mainNetPrivateKey);
  mainNetProvider = new WalletProvider(mainNetWallet, 'https://mainnet.infura.io/');
}

var ropstenPrivateKey;
var ropstenWallet;
var ropstenProvider;
if (process.env.ROPSTEN_PRIVATE_KEY) {
  ropstenPrivateKey = new Buffer(process.env.ROPSTEN_PRIVATE_KEY, 'hex');
  ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
  ropstenProvider = new WalletProvider(ropstenWallet, 'https://ropsten.infura.io/');
}

module.exports = {
  networks: {
    /*
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    */
    ropsten: {
      provider: ropstenProvider,

      // You can get the current gasLimit by running
      // truffle deploy --network rinkeby
      // truffle(rinkeby)> web3.eth.getBlock("pending", (error, result) =>
      //   console.log(result.gasLimit))
      gas: 4600000,
      gasPrice: web3.toWei('100', 'gwei'),
      network_id: '3',
    },
    mainnet: {
      provider: mainNetProvider,
      gas: 4600000,
      gasPrice: web3.toWei('4', 'gwei'),
      network_id: '1',
    },
  },
};
