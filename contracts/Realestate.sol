pragma solidity ^0.4.17;


contract Realestate {
    // model a house
    struct House {
        uint id;
        string title;
        address seller;
        string streetAddress;
        uint256 price;
    }

    mapping (uint=>House) public houses;

    uint public housesCount;

    function Realestate() public {
        addHouse("nha cua Thai", "Tp.HCM", 1000000000000000000);
        addHouse("nha cua Thai2", "Ha Noi", 2000000000000000000);

    }

    function addHouse(string title, string streetAddress, uint256 price) public {
        housesCount++;
        address host = msg.sender;
        houses[housesCount] = House(housesCount, title, host, streetAddress, price);
    }

    function buyHouse(uint256 houseId) payable public {
        address buyer = msg.sender;

    }
}