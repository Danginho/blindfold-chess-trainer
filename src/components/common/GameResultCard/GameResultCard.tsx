import React, { useContext } from "react";
import { GameContext } from "../ChessBoard/GameContext";
import "./GameResultCard.scss";

const GameResultCard: React.FC = () => {
  const { game, gameStatus, resetGame } = useContext(GameContext);

  if (!gameStatus.isGameOver) {
    return null;
  }

  const winnerColor = game.turn() === "w" ? "Black" : "White";

  let resultText = "";
  let methodText = "";

  if (gameStatus.isDraw) {
    resultText = "Draw";
    if (gameStatus.isThreefoldRepetition) {
      methodText = "by threefold repetition";
    } else if (gameStatus.isStalemate) {
      methodText = "by stalemate";
    } else if (gameStatus.isInsufficientMaterial) {
      methodText = "due to insufficient material";
    } else {
      methodText = "by agreement";
    }
  } else {
    resultText = `${winnerColor} won`;
    if (gameStatus.isCheckmate) {
      methodText = "by checkmate";
    } else {
      methodText = "by resignation";
    }
  }

  return (
    <div className="game-result-card">
      <h1 className="game-result-title">{resultText}</h1>
      <p className="game-result-method">{methodText}</p>
      <div onClick={resetGame}>New Game</div>
    </div>
  );
};

export default GameResultCard;
