import { Chess } from "chess.js";
export const getMoveHistory = (game: Chess) =>
  game
    .history({ verbose: true })
    .map((move) => move.from + move.to + (move.promotion ? move.promotion : ""))
    .join(" ");
