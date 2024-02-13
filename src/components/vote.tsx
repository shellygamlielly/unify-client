import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { StyledVoteIconButton } from "./styles/components-styles";

const VoteButton: React.FC = () => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVoteToggle = () => {
    setHasVoted((prev) => !prev);
  };

  return (
    <StyledVoteIconButton
      hasvote={hasVoted.toString()}
      onClick={handleVoteToggle}
    >
      <ThumbUpIcon />
    </StyledVoteIconButton>
  );
};

export default VoteButton;
