import React, { useEffect, useState } from "react";
import VoteButton from "../../Ui/MyButton/VoteButton/VoteButton";
import cl from "./Coin.module.css";

const Coin = ({ perc, setPerc, token }) => {
  const [color, setColor] = useState();
  const [modal, setModal] = useState(false);

  const changeColor = () => {
    if (perc < 50) {
      setColor("#c43d08");
    } else {
      setColor("green");
    }
  };

  useEffect(() => {
    changeColor();
  }, [perc]);

  return (
    <div className={cl.container}>
      {modal === true ? (
        <div className="modal">
          <div
            className="close"
            onClick={() => {
              setModal(false);
            }}
          ></div>
          <span>{token}</span>
        </div>
      ) : (
        ""
      )}
      <div className={cl.token}>{token}</div>
      <div className={cl.circle} style={{ boxShadow: `0 0 20px ${color}` }}>
        <div
          style={{
            marginTop: `${100 - perc}%`,
            boxShadow: `0 0 20px ${color}`,
            backgroundColor: `${color}`,
          }}
          className={cl.wave}
        ></div>
        <div className={cl.percentage}>{perc}%</div>
      </div>
      <div className={cl.buttons}>
        <VoteButton
          onClick={() => {
            setPerc(perc + 1);
          }}
        >
          Up
        </VoteButton>
        <VoteButton
          onClick={() => {
            setPerc(perc - 1);
          }}
          className="red"
        >
          Down
        </VoteButton>
        <button
          className={cl.infoButton}
          onClick={() => {
            setModal(true);
          }}
        >
          info
        </button>
      </div>
    </div>
  );
};

export default Coin;
