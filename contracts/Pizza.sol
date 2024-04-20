// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Pizza {
    struct Memo {
        string name;
        string toppings;
        uint256 timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyPizza(string memory name, string memory toppings) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name, toppings, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
