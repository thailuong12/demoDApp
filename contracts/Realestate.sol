pragma solidity ^0.4.24;


contract RealEstate {
    // model a house
    struct House {
        uint id;
        string title;
        address seller;
        string streetAddress;
        uint256 price;
        address buyer;
    }

    mapping (uint=>House) public houses;

    uint public housesCount;

    constructor() public {
        addHouse("nha cua Thai", "Tp.HCM", 1);
        addHouse("nha cua Thai2", "Ha Noi", 2);
        addHouse("nha cua Thai", "Tp.HCM", 3);
    }

    function addHouse(string title, string streetAddress, uint256 price) public {
        housesCount++;
        address host = msg.sender;
        houses[housesCount] = House(housesCount, title, host, streetAddress, price, 0x0);
    }

    function buyHouse(uint houseId) payable public {
      //  require(msg.value/1 ether == houses[houseId].price);
        address buyer = msg.sender;
        houses[houseId].seller.transfer(msg.value);
        houses[houseId].buyer = buyer;
    }
}