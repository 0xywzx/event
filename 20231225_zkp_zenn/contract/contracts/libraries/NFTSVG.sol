// SPDX-License-Identifier: GPL-2.0-or-later
// This code is inspired by the Uniswap V3 NFT SVG generator:
// https://github.com/Uniswap/v3-periphery/blob/b771ff9a20a0fd7c3233df0eb70d4fa084766cde/contracts/libraries/NFTSVG.sol

pragma solidity ^0.8.9;

import './HexStrings.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

library NFTSVG {

    using HexStrings for uint256;

    function generateSVG(uint256 tokenId, address owner) internal pure returns (string memory svg) {

        string memory color0 = tokenToColorHex(tokenId + uint256(uint160(owner)), 0);
        string memory color1 = tokenToColorHex(tokenId, 136);

        string memory idString = Strings.toString(tokenId);
        string memory ownerAddressString = addressToShortString(owner);

        return
            string(
                abi.encodePacked(
                    '<svg viewBox="0 0 100 100" width="600" height="600" fill="none" role="img" xmlns="http://www.w3.org/2000/svg"',
                    " xmlns:xlink='http://www.w3.org/1999/xlink'>",
                    //
                    '<defs> <path id="text-path-a" d="M50 4 A40 40 0 1 1 50 96 A40 40 0 1 1 50 4 Z" />',
                    // gradient
                    '<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#',
                    color0,
                    ';stop-opacity:1" /><stop offset="100%" style="stop-color:#',
                    color1,
                    ';stop-opacity:1" /></linearGradient>',
                    '</defs>',
                    // border
                    '<rect width="100%" height="100%" rx="50" fill="url(#gradient)" />',
                    '<rect width="90" height="90" x="5" y="5" rx="50" stroke-width="0.5" stroke="white" />',
                    // title
                    '<text text-anchor="middle" x="50" y="47" fill="white" font-size="7" font-weight="bold">',
                    "ZK Distributer", // variable
                    '</text>',
                    '<text text-anchor="middle" x="50" y="62" fill="white" font-size="7" font-weight="bold">',
                    "Catch The Flag", // variable
                    '</text>',
                    // rounding
                    '<text text-rendering="optimizeSpeed">',
                    '<textPath startOffset="-100%" fill="white" font-family="\'Courier New\', monospace" font-size="5px" xlink:href="#text-path-a">',
                    'token ID : ',
                    idString,
                    '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="10s" repeatCount="indefinite" /></textPath>',
                    '<textPath startOffset="0%" fill="white" font-family="\'Courier New\', monospace" font-size="5px" xlink:href="#text-path-a">'
                    'token ID : ',
                    idString,
                    '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="10s" repeatCount="indefinite" /> </textPath>',
                    '<textPath startOffset="50%" fill="white" font-family="\'Courier New\', monospace" font-size="5px" xlink:href="#text-path-a">',
                    ownerAddressString,
                    '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="10s" repeatCount="indefinite" /> </textPath>',
                    '<textPath startOffset="-50%" fill="white" font-family="\'Courier New\', monospace" font-size="5px" xlink:href="#text-path-a">',
                    ownerAddressString,
                    '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="10s" repeatCount="indefinite" /></textPath></text>',
                    '</svg>'
                )
            );
    }

    function addressToShortString(address _addr) public pure returns(string memory) {
        string memory addr = (uint256(uint160(_addr))).toHexString(20);
        string memory prefix = substring(addr, 0, 8);
        string memory suffix = substring(addr, 34, 42);
        return string(abi.encodePacked(prefix, '...', suffix));
    }

    function substring(string memory str, uint startIndex, uint endIndex) public pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
    }

    // Copied from :
    // https://github.com/Uniswap/v3-periphery/blob/6cce88e63e176af1ddb6cc56e029110289622317/contracts/libraries/NFTDescriptor.sol#L462-L464C1
    function tokenToColorHex(uint256 token, uint256 offset) public pure returns (string memory str) {
        return string((token >> offset).toHexStringNoPrefix(3));
    }
}