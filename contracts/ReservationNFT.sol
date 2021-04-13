pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ReservationNFT is ERC721 {
    mapping(uint => NFT) public nft;

    struct NFT {
        uint tokenId;
        string name;
        uint date;
        address payer;
    }

    event TicketSale (
        uint tokenId,
        string eventId,
        uint date,
        address payer
    );

    constructor() ERC721("ReservationNFT", "RNFT") public {}

    function mintNFT(string memory _tokenURI, string memory _name) public returns(bool) {
        uint _tokenId = totalSupply().add(1);
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        nft[_tokenId] = NFT(_tokenId, _name, block.timestamp, msg.sender);
        emit TicketSale(_tokenId, _tokenURI, block.timestamp, msg.sender);
        return true;
    }
}