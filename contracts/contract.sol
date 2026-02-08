// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// This contract is a simple example of a rewards contract.
contract Rewards {
    address public owner;
    mapping(address => uint256) public rewards;

    constructor() {
        owner = msg.sender;
    }

    function awardReward(address recipient, uint256 amount) public {
        require(msg.sender == owner, "Only owner can award rewards");
        rewards[recipient] += amount;
    }

    function getRewardBalance(address account) public view returns (uint256) {
        return rewards[account];
    }
} 