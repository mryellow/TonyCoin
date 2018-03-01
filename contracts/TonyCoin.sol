pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/CappedToken.sol';

// A birthday present for perpetuity. Capped (as there can be only one Tony), Mintable token.
contract TonyCoin is CappedToken {
    string public constant name = "TonyCoin"; // solium-disable-line uppercase
    string public constant symbol = "TNY"; // solium-disable-line uppercase
    uint8 public constant decimals = 18; // solium-disable-line uppercase

    // There can be only one Tony.
    uint256 private constant cap = 1 * 10**uint(decimals); // solium-disable-line uppercase
    // Always retaining at least 50% of himself.
    uint256 private constant limit = 5 * 10**uint(decimals-1); // solium-disable-line uppercase

    function TonyCoin() CappedToken(cap) public {}

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(limit == 0 || msg.sender != owner || balances[owner].sub(_value) > limit);
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(limit == 0 || _from != owner || balances[owner].sub(_value) > limit);
        return super.transferFrom(_from, _to, _value);
    }

}
