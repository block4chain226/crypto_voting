import "./App.css";
import React, { useEffect, useState } from "react";
import MarketSentiment from "./MarketSentiment.json";
import MyButton from "./Ui/MyButton/MyButton";
import Coin from "./components/Coin/Coin";
import VoteButton from "./Ui/MyButton/VoteButton/VoteButton";
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://rinkeby.infura.io/v3/189f266e87de48338d8dfd489747d635"
);
const signer = provider.getSigner();
const contract = new ethers.Contract(
  "0xb9855A4771728C16E0c45d25b39cE3F2709A1009",
  MarketSentiment.abi,
  provider
);

function App() {
  const [btc, setBtc] = useState(40);
  const [link, setLink] = useState(50);
  const [eth, setEth] = useState(90);
  const [modal, setModal] = useState(false);

  const getVotes = contract.getVotes("ETH");
  console.log("votes: ", getVotes);
  return (
    <div className="App">
      {modal === true ? (
        <div className="modal">
          <div
            className="close"
            onClick={() => {
              setModal(false);
            }}
          ></div>
        </div>
      ) : (
        ""
      )}
      <div className="header">
        <div className="logo">
          <h1>Sentiment</h1>
        </div>
        <div className="connect">
          <MyButton>Connect Wallet</MyButton>
        </div>
      </div>
      <div className="instructions">
        <span> Where do you think this tokens are going?</span>
        <span>Up or Down?</span>
      </div>
      <div className="cryptos">
        <Coin setModal={setModal} perc={btc} setPerc={setBtc} token={"Btc"} />
        <Coin setModal={setModal} perc={eth} setPerc={setEth} token={"Eth"} />
        <Coin
          setModal={setModal}
          perc={link}
          setPerc={setLink}
          token={"Link"}
        />
      </div>
    </div>
  );
}

export default App;
