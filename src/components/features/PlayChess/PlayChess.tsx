import { useContext } from "react";
import { StyledButton } from "../../common/Button/StyledButton";
import { Board } from "../../common/ChessBoard/Board";
import { GameContext } from "../../common/ChessBoard/GameContext";
import GameResultCard from "../../common/GameResultCard/GameResultCard";
import { StyledTabsWrapper } from "../../common/TabsWrapper/StyledTabsWrapper";
import { MoveSelector } from "../../MoveSelector/MoveSelector";
import styles from "./PlayChess.module.scss";

export const PlayChess = () => {
  const { gameStatus, setGameStarted, gameStarted, resetGame } =
    useContext(GameContext);

  const preGameTabs: JSX.Element[] = [
    <StyledButton onClick={() => setGameStarted(true)} text="Start" key="1" />,
  ];
  const gameOverTabs = [
    <div key="1">
      <GameResultCard />
      <StyledButton onClick={() => resetGame} text="New Game" />
    </div>,
  ];
  const gameActiveTabs = [
    <MoveSelector showLegalMoves key="a" />,
    // <StyledButton onClick={() => resetGame} text="New Game" />,
  ];

  // const gameStarted = game.history().length > 0;

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
        <StyledTabsWrapper>{tabs[0]}</StyledTabsWrapper>
      </div>
    </div>
  );
};
