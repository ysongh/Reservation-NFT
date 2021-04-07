pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ReservationNFT is ERC721 {
    event StorySale (
        uint storyId,
        uint amount,
        uint date,
        address from,
        address payable author
    );

    constructor() ERC721("ReservationNFT", "RNFT") public {}

    function mintNFT(string memory _tokenURI) public returns(bool) {
        uint _tokenId = totalSupply().add(1);
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        return true;
    }
}