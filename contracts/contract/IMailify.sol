pragma solidity >=0.5.2;

contract IMailify {
    function stake(bytes32 id) external payable;
    function checkStake(bytes32 id) external view;
    function rollbackStake(bytes32 id) external;
}

