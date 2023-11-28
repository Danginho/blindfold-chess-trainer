import { useContext } from "react";
import { Chessboard } from "react-chessboard";
// import { events } from "../../../utils/eventEmitter";
import { GameContext } from "./GameContext";
import { moveTopic } from "./moveTopic";

export const Board = () => {
  const { game } = useContext(GameContext);
  const isBlindfoldMode = false;

  const onDrop = (
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) => {
    try {
      moveTopic.publish({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      return true;
    } catch (err) {
      return false;
    }
  };

  const emptyPieces = {
    wP: () => <></>,
    wB: () => <></>,
    wN: () => <></>,
    wR: () => <></>,
    wQ: () => <></>,
    wK: () => <></>,
    bP: () => <></>,
    bB: () => <></>,
    bN: () => <></>,
    bR: () => <></>,
    bQ: () => <></>,
    bK: () => <></>,
  };

  const darkSquareColour = isBlindfoldMode ? "#47523b" : "#779952";
  const lightSquareColour = isBlindfoldMode ? "#898a7e" : "#edeed1";

  return (
    <Chessboard
      id="Configurable Board"
      position={game.fen()}
      customBoardStyle={{
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
      }}
      customDarkSquareStyle={{ backgroundColor: darkSquareColour }}
      customLightSquareStyle={{ backgroundColor: lightSquareColour }}
      customDropSquareStyle={{
        boxShadow: "inset 0 0 1px 6px rgba(255,255,255,0.75)",
      }}
      onArrowsChange={function noRefCheck() {}}
      onDragOverSquare={function noRefCheck() {}}
      onMouseOutSquare={function noRefCheck() {}}
      onMouseOverSquare={function noRefCheck() {}}
      onPieceClick={function noRefCheck() {}}
      onPieceDragBegin={function noRefCheck() {}}
      onPieceDragEnd={function noRefCheck() {}}
      onPieceDrop={onDrop}
      // onPromotionPieceSelect={function noRefCheck() {}}
      onSquareClick={function noRefCheck() {}}
      // onSquareRightClick={function noRefCheck() {}}
      customPieces={isBlindfoldMode ? emptyPieces : undefined}
    />
  );
};
