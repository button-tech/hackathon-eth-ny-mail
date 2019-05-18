pragma solidity >=0.5.2;

contract Mailify {

    uint256 TIME_STAKED = 100;

    mapping(address => mapping(bytes32 =>uint256)) stakedSum;
    mapping(bytes32 => uint256) stakedTime;
    mapping(bytes32 => bool) isStaked;
    mapping(bytes32 => bool) isDone;


    function stake(bytes32 id) payable external {
        if (!isStaked[id]) {
            stakedSum[msg.sender][id] += msg.value;
            stakedTime[id] = block.timestamp; // senders
            isStaked[id] = true;
        } else {
            revert("Was staked before");
        }
    }

    // function approveStake() external {

    // }

    function rollbackStake(bytes32 id) external {

        uint256 currentTime = block.timestamp;

        if(isStaked[id]) {
            if (currentTime - stakedTime[id] >= TIME_STAKED && !isDone[id]) {
                msg.sender.transfer(stakedSum[msg.sender][id]);
                isDone[id] = true;
                stakedSum[msg.sender][id] = 0;
            }
            else {
                revert("Wait till stake time ends");
            }
        } else {
                revert("No current id");
            }
    }


    function checkStake(bytes32 id) public view returns(bool) {
        return isStaked[id];
    }

    function() external payable {
        revert("Use stake only!");
    }

}