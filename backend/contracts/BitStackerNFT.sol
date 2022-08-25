//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// import "hardhat/console.sol";


error SALE_IS_NOT_LIVE();
error MINT_ONLY_VIP_TOKENS();
error MINT_ONLY_NORMAL_TOKENS();
error INSUFFICIENT_FUNDS();
error NOT_ENOUGH_HATHRATE_AVAILABLE();
error NULL_BALANCE();
error UNABLE_TO_TRANSFER_FUNDS();
error TOKEN_NOT_EXIST();

contract BitStackerNFT is Ownable, ERC1155Supply {

    uint public THForPresale = 120_000;
    uint public THForPublicsale = 40_000;
    uint public totalTerraHashes = THForPresale + THForPublicsale;

    // Types of tokens  -> For Mainnet
    Tokentype public vipBlack = Tokentype(0, 40, 2 ether, 0);
    Tokentype public vipBlue = Tokentype(1, 4, 0.2 ether, 0);
    Tokentype public black = Tokentype(2, 20, 1 ether, 0);
    Tokentype public blue = Tokentype(3, 4, 0.2 ether, 0);


    // Types of tokens  -> For Testnet
    // Tokentype public vipBlack = Tokentype(0, 40, 0.00001 ether, 0);
    // Tokentype public vipBlue = Tokentype(1, 4, 0.00001 ether, 0);
    // Tokentype public black = Tokentype(2, 20, 0.00001 ether, 0);
    // Tokentype public blue = Tokentype(3, 4, 0.00001 ether, 0);

    string public name = "BitStacker Tokens";
    string private baseURL = "https://ipfs.io/ipfs/QmXtQ3CdFaTMRFBAz36N47R8dhJ1REPKnxaGxaS47SxroA/";

    enum Category {VIPBLACK, VIPBLUE, BLACK, BLUE}

    struct Tokentype {
        uint8 id;
        uint hashRate;
        uint price;
        uint terraHashedSold;
    }

    bool public privateSale = false;
    bool public publicSale = false;

    constructor() ERC1155(""){}
    
    function mint(Category _category, uint256 _amount) payable public {

        if(!privateSale && !publicSale) revert SALE_IS_NOT_LIVE();

        if(privateSale){
            if(_category != Category.VIPBLACK && _category != Category.VIPBLUE){
                revert MINT_ONLY_VIP_TOKENS();
            }


            if(_category == Category.VIPBLACK){
                uint totalCost = vipBlack.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = vipBlack.hashRate * _amount;
                if(totalPresaleTerraHashesSold() + totalTerraHashesMinting > THForPresale){
                    revert NOT_ENOUGH_HATHRATE_AVAILABLE();
                }
                vipBlack.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }
            else {
                uint totalCost = vipBlue.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = vipBlue.hashRate * _amount;
                if(totalPresaleTerraHashesSold() + totalTerraHashesMinting > THForPresale){
                    revert NOT_ENOUGH_HATHRATE_AVAILABLE();
                }
                vipBlue.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }


        }
        else {

            if(_category != Category.BLACK && _category != Category.BLUE){
                revert MINT_ONLY_NORMAL_TOKENS();
            }

            if(_category == Category.BLACK){
                uint totalCost = black.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = black.hashRate * _amount;
                if(totalPublicsaleterraHashesSold() + totalTerraHashesMinting > THForPublicsale){
                    revert NOT_ENOUGH_HATHRATE_AVAILABLE();
                }
                black.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }
            else {
                uint totalCost = blue.price * _amount;
                if(msg.value < totalCost) revert INSUFFICIENT_FUNDS();
                uint totalTerraHashesMinting = blue.hashRate * _amount;
                if(totalPublicsaleterraHashesSold() + totalTerraHashesMinting > THForPublicsale){
                    revert NOT_ENOUGH_HATHRATE_AVAILABLE();
                }
                blue.terraHashedSold += totalTerraHashesMinting;
                _mint(msg.sender, uint256(_category), _amount, "");
            }

        }

    }

    function totalPresaleTerraHashesSold() public view returns(uint) {
        return vipBlack.terraHashedSold + vipBlue.terraHashedSold;
    }

    function totalPublicsaleterraHashesSold() public view  returns(uint) {
        return black.terraHashedSold + blue.terraHashedSold;
    }

    function uri(uint256 _tokenid) override public view returns (string memory) {
        if(!exists(_tokenid)) revert TOKEN_NOT_EXIST();

        return string(
            abi.encodePacked(
                baseURL,
                Strings.toString(_tokenid),".json"
            )
        );
    }

    // Functions for administration

    function setSaleType(bool _privateSale, bool _publicSale) public onlyOwner {
        privateSale = _privateSale;
        publicSale = _publicSale;
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