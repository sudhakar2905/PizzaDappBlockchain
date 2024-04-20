import pizzaABI from "./contract/pizza.json"; // assuming you have a pizza contract ABI
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import BuyPizza from "./components/BuyPizza"; // a component for buying pizza
import PizzaMemos from "./components/PizzaMemos"; // a component for pizza memos
import pizzaImage from "./pizza.jpeg"; // an image of pizza
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xYourPizzaContractAddress"; // Replace with your pizza contract address
      const contractABI = pizzaABI.abi; // assuming your pizza contract ABI is stored in pizza.json
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={pizzaImage} className="img-fluid" alt="Pizza" width="100%" />
      <p className="text-muted lead" style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <BuyPizza state={state} />
        <PizzaMemos state={state} />
      </div>
    </div>
  );
}

export default App;
