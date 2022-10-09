//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;


/// @title	Bitstaker NFTs. 
/// @author	Ali (alirazzaquet@gmail.com)

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// import "hardhat/console.sol";

error SALE_IS_NOT_LIVE();
error MINT_ONLY_VIP_TOKENS();
error MINT_ONLY_NORMAL_TOKENS();
error INSUFFICIENT_FUNDS();
error NOT_ENOUGH_HASHRATE_AVAILABLE();
error NULL_BALANCE();
error UNABLE_TO_TRANSFER_FUNDS();
error TOKEN_NOT_EXIST();
error BOTH_CANT_BE_TRUE();
error ONLY_WHITELISTED_ALLOWED();

contract BitStackerNFT is Ownable, ERC1155Supply {
    // mapping(uint256 => uint256) private _totalSupply;
    bool public onlyWhiteListed = false;
    mapping(address => bool) public isWhiteListed;

    uint public THForPresale = 40_000;
    uint public THForPublicsale = 40_000;
    uint public totalTerraHashes = THForPresale + THForPublicsale;

    // Types of tokens  -> For Mainnet
    // Tokentype public vipBlack = Tokentype(0, 40, 2 ether, 0);
    // Tokentype public vipBlue = Tokentype(1, 4, 0.2 ether, 0);
    // Tokentype public black = Tokentype(2, 20, 1 ether, 0);
    // Tokentype public blue = Tokentype(3, 4, 0.2 ether, 0);


    // Types of tokens  -> For Testnet
    Tokentype public vipBlack = Tokentype(0, 40, 0 ether, 0);
    Tokentype public vipBlue = Tokentype(1, 4, 0 ether, 0);
    Tokentype public black = Tokentype(2, 20, 0 ether, 0);
    Tokentype public blue = Tokentype(3, 4, 0 ether, 0);

    string public name = "BitStacker Tokens";
    string private baseURL = "https://ipfs.io/ipfs/QmeVoaJp5pZbEboNLsZAV7DnXsFHZRmbvQ3RendamWoXX1/";

    mapping (address => ContactInfo) public contactInfo;

    struct ContactInfo {
        string bitCoinAddress;
        string emailAddress;
    }

    enum Category { VIPBLACK, VIPBLUE, BLACK, BLUE }

    struct Tokentype {
        uint8 id;
        uint hashRate;
        uint price;
        uint terraHashedSold;
    }

    enum SaleTpe { CLOSED, PRIVATE, PUBLIC }
    SaleTpe public saleType = SaleTpe.CLOSED;

    constructor() ERC1155(""){}
    
    function mint(
        Category _category, 
        uint256 _amount,
        ContactInfo memory _contactInfo
        ) payable public {

        if(saleType == SaleTpe.CLOSED) revert SALE_IS_NOT_LIVE();

        if(onlyWhiteListed && !isWhiteListed[msg.sender]) {
            revert ONLY_WHITELISTED_ALLOWED();
        }

        if(saleType == SaleTpe.PRIVATE){

            if(_category == Category.VIPBLACK){
                uint totalCost = vipBlack.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = vipBlack.hashRate * _amount;
                if(totalPresaleTerraHashesSold() + totalTerraHashesMinting > THForPresale){
                    revert NOT_ENOUGH_HASHRATE_AVAILABLE();
                }
                vipBlack.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }
            else if(_category == Category.VIPBLUE) {
                uint totalCost = vipBlue.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = vipBlue.hashRate * _amount;
                if(totalPresaleTerraHashesSold() + totalTerraHashesMinting > THForPresale){
                    revert NOT_ENOUGH_HASHRATE_AVAILABLE();
                }
                vipBlue.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }
            else {
                revert MINT_ONLY_VIP_TOKENS();
            }


        }
        else if(saleType == SaleTpe.PUBLIC){

            if(_category == Category.BLACK){
                uint totalCost = black.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = black.hashRate * _amount;
                if(totalPublicsaleterraHashesSold() + totalTerraHashesMinting > THForPublicsale){
                    revert NOT_ENOUGH_HASHRATE_AVAILABLE();
                }
                black.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }
            else if(_category == Category.BLUE){
                uint totalCost = blue.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = blue.hashRate * _amount;
                if(totalPublicsaleterraHashesSold() + totalTerraHashesMinting > THForPublicsale){
                    revert NOT_ENOUGH_HASHRATE_AVAILABLE();
                }
                blue.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }
            else {
                revert MINT_ONLY_NORMAL_TOKENS();
            }

        }

        contactInfo[msg.sender] = _contactInfo;

    }

    function totalPresaleTerraHashesSold() public view returns(uint) {
        return vipBlack.terraHashedSold + vipBlue.terraHashedSold;
    }

    function totalPublicsaleterraHashesSold() public view  returns(uint) {
        return black.terraHashedSold + blue.terraHashedSold;
    }

    function terrahashesAvailabe() public view returns(uint){
        return (totalTerraHashes - (totalPresaleTerraHashesSold() + totalPublicsaleterraHashesSold()));
    }

    function uri(uint256 _tokenid) override public view returns (string memory) {
        if(!exists(_tokenid)) revert TOKEN_NOT_EXIST();

        return string(
            abi.encodePacked(
                baseURL,
                Strings.toString(uint8(_tokenid)),".json"
            )
        );
    }

    function resetContactInfo(ContactInfo memory _contactInfo) public {
        contactInfo[msg.sender] = _contactInfo;
    }

    function balancesOf(address user) public view returns(
        uint256 _vipBlack, uint256 _vipBlue, uint256 _black, uint256 _blue
    ) {
        _vipBlack = balanceOf(user, 0);
        _vipBlue = balanceOf(user, 1);
        _black = balanceOf(user, 2);
        _blue = balanceOf(user, 3);
    }

    function hashesOf(address user) public view returns(
        uint256 _vipBlackHash, uint256 _vipBlueHash, uint256 _blackHash, uint256 _blueHash
    ) {
        _vipBlackHash = (balanceOf(user, 0))*vipBlack.hashRate;
        _vipBlueHash = (balanceOf(user, 1))*vipBlue.hashRate;
        _blackHash = (balanceOf(user, 2))*black.hashRate;
        _blueHash = (balanceOf(user, 3))*blue.hashRate;
    }

    function whiteListUsers(address[] memory addresses) public onlyOwner {
        for(uint8 i; i < addresses.length; i++){
            isWhiteListed[addresses[i]] = true;
        }
    }

    function changeWhiteListStatus(bool newStatus) public onlyOwner {
        onlyWhiteListed = newStatus;
    }


    /// @notice functions for administration

    function setSaleType(SaleTpe _saleType) public onlyOwner {
        saleType = _saleType;

    }

    function extendTerraHashes(uint _THForpresale, uint _THForPublicsale) public onlyOwner {
        THForPresale = _THForpresale;
        THForPublicsale = _THForPublicsale;
        totalTerraHashes = _THForpresale + _THForPublicsale;
    }

    function withdrawFunds() public onlyOwner {
        uint balance = address(this).balance;
        if(balance == 0) revert NULL_BALANCE();
        (bool res1,) = payable(owner()).call{value: balance}("");
        if(!res1) revert UNABLE_TO_TRANSFER_FUNDS();
    }



}