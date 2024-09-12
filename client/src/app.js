const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pizzaIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "toppings",
				"type": "string"
			}
		],
		"name": "buyPizza",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "pizzaName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "toppings",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "PizzaOrdered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "availablePizzas",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAvailablePizzas",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct Pizza.PizzaDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "pizzaName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "toppings",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					}
				],
				"internalType": "struct Pizza.PizzaOrder[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "string",
				"name": "pizzaName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "toppings",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xf9DE8Df1C750d165A6312B8c0EdE880e912295F5';  // Replace with your deployed contract address

let web3;
let contract;

async function loadBlockchainData() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(contractABI, contractAddress);

        // Load available pizzas
        loadPizzas();
        
        // Display order history
        displayOrders();
    } else {
        alert("Please install MetaMask to use this DApp!");
    }
}

async function loadPizzas() {
    const pizzas = await contract.methods.getAvailablePizzas().call();
    const pizzaSelect = document.getElementById('pizza');
    pizzaSelect.innerHTML = '';  // Clear existing options

    pizzas.forEach((pizza, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = `${pizza.name} - ${web3.utils.fromWei(pizza.price, 'ether')} ETH`;
        pizzaSelect.appendChild(option);
    });
}

async function buyPizza() {
    const pizzaIndex = document.getElementById('pizza').value;
    const toppings = document.getElementById('toppings').value;
    const accounts = await web3.eth.getAccounts();
    
    const pizza = await contract.methods.getAvailablePizzas().call(pizzaIndex);
    const pizzaPrice = pizza[pizzaIndex].price;

    // Send transaction
    await contract.methods.buyPizza(pizzaIndex, toppings).send({
        from: accounts[0],
        value: pizzaPrice
    });

    // Reload order history
    displayOrders();
}

async function displayOrders() {
    const orders = await contract.methods.getOrders().call();
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';  // Clear the existing list

    orders.forEach(order => {
        const li = document.createElement('li');
        li.innerHTML = `Pizza: ${order.pizzaName}, Toppings: ${order.toppings}, Price: ${web3.utils.fromWei(order.price, 'ether')} ETH, Buyer: ${order.buyer}`;
        ordersList.appendChild(li);
    });
}

document.getElementById('buyPizzaBtn').addEventListener('click', buyPizza);

window.onload = loadBlockchainData;
