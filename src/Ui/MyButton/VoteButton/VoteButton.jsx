import React from "react";
import cl from "./VoteButton.module.css";

const VoteButton = ({ children, className, ...buttonProps }) => {
  return (
    <button className={cl.voteButton} {...buttonProps}>
      {children}
    </button>
  );
};

export default VoteButton;
