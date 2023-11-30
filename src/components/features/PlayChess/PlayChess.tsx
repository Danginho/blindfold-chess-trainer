import { useContext } from "react";
import { Board } from "../../common/ChessBoard/Board";
import { GameContext } from "../../common/ChessBoard/GameContext";
import GameResultCard from "../../common/GameResultCard/GameResultCard";
import { StyledTabsWrapper } from "../../common/TabsWrapper/StyledTabsWrapper";
import { MoveSelector } from "../../MoveSelector/MoveSelector";
import styles from "./PlayChess.module.scss";

export const PlayChess = () => {
  const { gameStatus, startNewGame, game } = useContext(GameContext);

  const preGameTabs: JSX.Element[] = [<div onClick={startNewGame}>Start</div>];
  const gameOverTabs = [<GameResultCard />];
  const gameActiveTabs = [<MoveSelector showLegalMoves />];

  const gameStarted = game.history().length > 0;

  const tabs = [
    !gameStarted
      ? preGameTabs
      : gameStatus.isGameOver
      ? gameOverTabs
      : gameActiveTabs,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.chessboard}>
        <Board />
      </div>
      <div className={styles.tabsColumn}>
        <StyledTabsWrapper>{tabs}</StyledTabsWrapper>
      </div>
    </div>
  );
};
