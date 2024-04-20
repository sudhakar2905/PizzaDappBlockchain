import { ethers } from "ethers";

const BuyPizza = ({ state }) => {
  const buyPizza = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.001") }; // Adjust the amount as per your pizza contract
    const transaction = await contract.buyPizza(name, message, amount); // Assuming buyPizza is the function in your pizza contract
    await transaction.wait();
    console.log("Transaction is done");
  };

  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyPizza}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Buy Pizza
          </button>
        </form>
      </div>
    </>
  );
};

export default BuyPizza;
