// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RainbowNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string private _baseTokenURI;

    constructor(
        string memory baseTokenURI
    ) ERC721("Rainbow NFT", "RNFT") Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
    }

    function setBaseTokenURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function mint(string memory tokenURI) public {
        uint256 tokenId = totalSupply() + 1;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function hasNFT(address owner) public view returns (bool) {
        for (uint256 i = 0; i < totalSupply(); i++) {
            if (ownerOf(i) == owner) {
                return true;
            }
        }
        return false;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(tokenId <= totalSupply(), "URI query for nonexistent token");
        return
            string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
    }
}
