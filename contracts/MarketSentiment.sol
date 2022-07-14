//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract MarketSentiment{
    address public owner;
    string[] public tickersArray;
    mapping(bytes32=>mapping(address=>bool)) roles;
    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant USER = keccak256("USER");

    struct ticker{
        bool exist;
        uint up;
        uint down;
        mapping(address=>bool) Voters;
    }

    event tickerUpdated(
        uint up,
        uint down,
        address voter,
        string ticker
    );

    mapping(string => ticker) private Tickers;

    constructor(){
        owner = msg.sender;
        _grantRole(ADMIN, msg.sender);
    }

    modifier onlyRole(bytes32 _role) { 
        require(roles[_role][msg.sender], "you are not logIn!");
        _;
    }

    function _grantRole(bytes32 _role, address _account) internal{
        roles[_role][_account] = true;
    }

    function grantRole(bytes32 _role, address _account) external onlyRole(ADMIN){
       _grantRole(_role, _account);
    }

    function addTicker(string memory _ticker) public onlyRole(ADMIN){
        require(!Tickers[_ticker].exist, "Ticker already exist!");
        ticker storage newTicker = Tickers[_ticker];
        newTicker.exist = true;
        tickersArray.push(_ticker);
    }

    function vote(string memory _ticker, bool _vote) public {
        require(Tickers[_ticker].exist, "ticker not exist!");
        require(! Tickers[_ticker].Voters[msg.sender], "You have already voted for this coin!");
        ticker storage t = Tickers[_ticker];
        t.Voters[msg.sender] = true;
        _vote == true ? t.up++ : t.down++;
        emit tickerUpdated(t.up, t.down, msg.sender, _ticker);
    }

    function getVotes(string memory _ticker) public view returns(uint up, uint down){
        require(Tickers[_ticker].exist, "Ticker does not exist!");
        ticker storage t = Tickers[_ticker];
        return(t.up, t.down);
    }
 
}