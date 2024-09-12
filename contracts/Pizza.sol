// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Pizza {
    
    struct PizzaOrder {
        string pizzaName;
        string toppings;
        uint256 price;  // Price in wei (smallest denomination of Ether)
        uint256 timestamp;
        address buyer;
    }

    struct PizzaDetails {
        string name;
        uint256 price;
    }

    PizzaDetails[] public availablePizzas;  // List of pizzas available
    PizzaOrder[] public orders;  // List of all orders

    address payable public owner;  // Contract owner (pizza shop)

    event PizzaOrdered(
        string pizzaName,
        string toppings,
        uint256 price,
        uint256 timestamp,
        address buyer
    );

    constructor() {
        owner = payable(msg.sender);

        // Add some pizza varieties with prices
        availablePizzas.push(PizzaDetails("Margherita", 0.01 ether));
        availablePizzas.push(PizzaDetails("Pepperoni", 0.015 ether));
        availablePizzas.push(PizzaDetails("Veggie", 0.012 ether));
        availablePizzas.push(PizzaDetails("BBQ Chicken", 0.018 ether));
    }

    // Function to buy a pizza
    function buyPizza(uint256 pizzaIndex, string memory toppings) public payable {
        require(pizzaIndex < availablePizzas.length, "Invalid pizza selection");
        PizzaDetails memory pizza = availablePizzas[pizzaIndex];
        require(msg.value == pizza.price, "Incorrect payment amount");

        // Transfer the payment to the owner
        owner.transfer(msg.value);

        // Record the transaction
        orders.push(PizzaOrder(
            pizza.name,
            toppings,
            pizza.price,
            block.timestamp,
            msg.sender
        ));

        // Emit an event for the new pizza order
        emit PizzaOrdered(pizza.name, toppings, pizza.price, block.timestamp, msg.sender);
    }

    // Get the list of available pizzas
    function getAvailablePizzas() public view returns (PizzaDetails[] memory) {
        return availablePizzas;
    }

    // Get all orders (transaction history)
    function getOrders() public view returns (PizzaOrder[] memory) {
        return orders;
    }
}
