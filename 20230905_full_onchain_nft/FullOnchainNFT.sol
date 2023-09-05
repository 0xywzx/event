// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "base64-sol/base64.sol";

contract FullOnchainBlockchainBiz is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("FullOnchainBlockchainBiz", "FBB") {
        safeMint(msg.sender);
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 _tokenId) public view override(ERC721) returns (string memory) {
        string memory image = Base64.encode(bytes(generateSVG()));
        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"', "Full-onchain-nft-sample",
                                '", "description":"', "Description is just discription.",
                                '", "image":"', 'data:image/svg+xml;base64,', image,
                                '", "attributes": [{"trait_type": "Type",  "value": "', "Full-onchain",
                                '"}]}'
                            )
                        )
                    )
                )
            );
    }

    function generateSVG() internal pure returns (string memory svg) {
        return
            string(
                abi.encodePacked(
                    '<svg viewBox="0 0 100 100" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">',
                    '<defs>',
                    '<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">',
                    '<stop offset="0%" style="stop-color:#29b6f6;stop-opacity:1" />',
                    '<stop offset="100%" style="stop-color:#ab47bc;stop-opacity:1" />',
                    '</linearGradient>',
                    '</defs>',
                    '<circle cx="50" cy="50" r="40" fill="url(#gradient)" />',
                    '<text x="50" y="53" text-anchor="middle" fill="#ffffff" font-weight="bold" font-family="Arial" font-size="8">Full on-chain NFT</text>',
                    '</svg>'
                )
            );
    }
}