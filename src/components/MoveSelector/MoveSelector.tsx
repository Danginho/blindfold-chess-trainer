import { useState, useEffect, useRef, useContext } from "react";
import { GameContext } from "../common/ChessBoard/GameContext";
import { MoveInput } from "./MoveInput/MoveInput";
import { MoveList } from "./MoveList/MoveList";
import "./MoveSelector.scss";

interface IMoveSelectorProps {
  showLegalMoves: boolean;
}

export const MoveSelector = (props: IMoveSelectorProps) => {
  const { showLegalMoves } = props || true;
  const [filter, setFilter] = useState("");
  const { game, isEngineTurn, gameStatus } = useContext(GameContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const availableMoves = game.moves();

  useEffect(() => {
    setFilter("");
    if (gameStatus.isGameOver) {
      inputRef.current?.focus();
    }
  }, [game, gameStatus]);

  return (
    <div className="move-selector">
      <MoveInput
        filter={filter}
        setFilter={setFilter}
        inputRef={inputRef}
        availableMoves={availableMoves}
        className="move-input"
      />
      {showLegalMoves && !isEngineTurn(game.turn()) && (
        <MoveList
          availableMoves={availableMoves}
          filter={filter}
          className="move-list"
        />
      )}
    </div>
  );
};
