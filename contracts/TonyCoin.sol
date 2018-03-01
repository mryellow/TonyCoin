pragma solidity ^0.4.18;

//import 'zeppelin-solidity/contracts/ownership/Claimable.sol';
import 'zeppelin-solidity/contracts/ownership/Heritable.sol';
import 'zeppelin-solidity/contracts/token/ERC20/CappedToken.sol';

// A birthday present for perpetuity. Capped (as there can be only one Tony), Heritable, Mintable token.
contract TonyCoin is CappedToken, Heritable {
    string public constant name = "TonyCoin"; // solium-disable-line uppercase
    string public constant symbol = "TNY"; // solium-disable-line uppercase
    uint8 public constant decimals = 18; // solium-disable-line uppercase

    function TonyCoin(uint256 _cap, uint256 _heartbeatTimeout) CappedToken(_cap) Heritable(_heartbeatTimeout) public {}

}
