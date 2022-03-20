// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721,Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;
    uint256 maxNftAmount;
    constructor() ERC721("My Breathtaking Pixel Bois", "BOI") {
      baseTokenURI = "QmdjAPjtUTVGfPKumoUqMnsvDER28hcwB3jMAUgFaiGRQk/";
       maxNftAmount = 888;
    }
    
    function contractURI() public pure returns (string memory) {
       return "QmdzNse3GwYaDBxshS1jnBXAFqX3hepJtBBBQxEutn1Ave";
    }

    function mintFree()
        public
        returns (uint256)
    {
        require(currentTokenId.current() < maxNftAmount);
        require(balanceOf(address(msg.sender)) < 2);
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(address(msg.sender), newItemId);
        return newItemId;
    }
  
    /// @dev Returns an URI for a given token ID
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  /// @dev Sets the base token URI prefix.
  function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  function changeMaxMint(uint256 _maxAmount)public onlyOwner {
    maxNftAmount = _maxAmount;
  }

  function totalMinted() public view returns (uint) {
        return currentTokenId.current();
    }

}
