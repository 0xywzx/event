// SPDX-License-Identifier: GPL-2.0-or-later
// @tittle ZK Distributer

//  _____   __ __
// /__  /  / //_/
//   / /  / ,<
//  / /__/ /| |
// /____/_/ |_|     __       _ __          __
//    / __ \(_)____/ /______(_) /_  __  __/ /____  _____
//   / / / / / ___/ __/ ___/ / __ \/ / / / __/ _ \/ ___/
//  / /_/ / (__  ) /_/ /  / / /_/ / /_/ / /_/  __/ /
// /_____/_/____/\__/_/  /_/_.___/\__,_/\__/\___/_/
//
// from https://www.asciiart.eu/text-to-ascii-art slant

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "base64-sol/base64.sol";

import './libraries/NFTSVG.sol';
import './verifier.sol';

interface IVerifier {
  function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[2] calldata _pubSignals) external returns (bool);
}

contract ZKDistributer is ERC721 {

    constructor(
        IVerifier _verifier,
        uint _root
    )
        ERC721("ZKDistributerCTF", "ZKD")
    {
        verifier = _verifier;
        root = _root;
    }

    /**************
     * Immutables *
     **************/
    IVerifier public immutable verifier;

    /*************
     * Constants *
     *************/
    string public constant nftName = "ZK Distributer CTF";
    string public constant description = "This is a NFT for ZK Distributer CTF winner.";

    /*************
     * Variables *
     *************/
    uint public root;
    mapping(uint => bool) public secretHashes;

    // @dev _nextTokenId for token id
    uint256 private _nextTokenId;

    /*************************
     * Public View Functions *
     *************************/
    function tokenURI(uint256 _tokenId) public view override(ERC721) returns (string memory) {

        string memory image = Base64.encode(
            bytes(
                NFTSVG.generateSVG(
                    _tokenId,
                    ownerOf(_tokenId)
                )
            )
        );

        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"', nftName,
                                '", "description":"', description,
                                '", "image":"', 'data:image/svg+xml;base64,', image,
                                '", "attributes": [{"trait_type": "Type",  "value": "Winner"}]}'
                            )
                        )
                    )
                )
            );

    }

    /********************
     * Public Functions *
     ********************/
    function safeMint(
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[2] calldata _pubSignals
    )
        public
    {
        uint256 tokenId = _nextTokenId++;

        // Check if secretHash has not been used
        require(!secretHashes[_pubSignals[1]], "The secret has been already used");

        // Check if the Merkle tree root matches the registered root
        require(_pubSignals[0] == root, "The root does not match the registered root");

        // Verify the proof
        require(
            verifier.verifyProof(
                _pA,
                _pB,
                _pC,
                _pubSignals
            ),
            "Invalid proof"
        );

        // Update the secretHash status
        secretHashes[_pubSignals[1]] = true;

        _safeMint(msg.sender, tokenId);
    }

}