import { Chess } from "chess.js";
import React, { createContext, useState, useCallback, useEffect } from "react";
import { Stockfish } from "./engine";

import { moveTopic } from "./moveTopic";
import { getMoveHistory } from "./utils/getMoveHistory";

interface IGameContext {
  game: Chess;
  setGame: React.Dispatch<React.SetStateAction<Chess>>;
  resetGame: React.Dispatch<React.SetStateAction<Chess>>;
  setBlackPlayerType: React.Dispatch<React.SetStateAction<IPlayerType>>;
  setWhitePlayerType: React.Dispatch<React.SetStateAction<IPlayerType>>;
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  gameStatus: IGameStatus;
  isEngineTurn: (colour: IPlayerColour) => boolean;
}

export type IPlayerColour = "w" | "b";
export type IPlayerType = "human" | "engine";
export type IMove =
  | string
  | {
      from: string;
      to: string;
      promotion?: string;
    };

export const GameContext = createContext<IGameContext>({
  game: new Chess(),
  setGame: () => {},
  resetGame: () => {},
  setBlackPlayerType: () => {},
  setWhitePlayerType: () => {},
  gameStatus: {
    isGameOver: false,
    isDraw: false,
    isCheckmate: false,
    isThreefoldRepetition: false,
    isStalemate: false,
    isInsufficientMaterial: false,
  },
  setGameStarted: () => {},
  gameStarted: false,
  isEngineTurn: () => false,
});

interface ProviderProps {
  children: React.ReactNode;
}

interface IGameStatus {
  isGameOver: boolean;
  isDraw: boolean;
  isCheckmate: boolean;
  isThreefoldRepetition: boolean;
  isStalemate: boolean;
  isInsufficientMaterial: boolean;
}

export const GameProvider: React.FC<ProviderProps> = ({ children }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [gameLocked, setGameLocked] = useState<boolean>(false);
  const [whitePlayerType, setWhitePlayerType] = useState<IPlayerType>("engine");
  const [blackPlayerType, setBlackPlayerType] = useState<IPlayerType>("human");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<IGameStatus>({
    isGameOver: game.isGameOver(),
    isDraw: game.isDraw(),
    isCheckmate: game.isCheckmate(),
    isThreefoldRepetition: game.isThreefoldRepetition(),
    isStalemate: game.isStalemate(),
    isInsufficientMaterial: game.isInsufficientMaterial(),
  });

  const isEngineTurn = useCallback(
    (colour: "b" | "w") => {
      if (colour === "w") {
        return whitePlayerType === "engine";
      }
      return blackPlayerType === "engine";
    },
    [blackPlayerType, whitePlayerType]
  );

  const makeMoveInUI = (move: IMove) => {
    if (!gameStarted) return;
    if (!gameLocked) {
      setGame((g) => {
        const gameCopy = Object.assign(
          Object.create(Object.getPrototypeOf(g)),
          g
        );
        const mover = gameCopy.turn();
        try {
          gameCopy.move(move);
        } catch (err) {
          console.log(err);
        }

        if (isEngineTurn(mover)) {
          setGameLocked(false);
        }
        return gameCopy;
      });
    } else {
      console.log(`Ignoring move, game is currently locked`, move);
    }
  };

  useEffect(() => {
    const gameIsOver = game.isGameOver();
    const newGameStatus = {
      isGameOver: gameIsOver,
      isDraw: game.isDraw(),
      isCheckmate: game.isCheckmate(),
      isThreefoldRepetition: game.isThreefoldRepetition(),
      isStalemate: game.isStalemate(),
      isInsufficientMaterial: game.isInsufficientMaterial(),
    };
    if (gameIsOver) {
      setGameLocked(true);
    }
    setGameStatus(newGameStatus);
  }, [game]);

  useEffect(() => {
    if (!gameStarted) return;
    moveTopic.subscribe(makeMoveInUI);

    return () => {
      moveTopic.unsubscribe(makeMoveInUI);
    };
  }, [gameStarted]);

  useEffect(() => {
    const prepareMoveIfEngineTurn = () => {
      if (!gameStarted) return;
      if (isEngineTurn(game.turn()) && !gameLocked && !gameStatus.isGameOver) {
        setGameLocked(true);
        Stockfish.setMoveHistory(getMoveHistory(game));
        Stockfish.replyToPosition();
      }
    };
    prepareMoveIfEngineTurn();
  }, [isEngineTurn, gameLocked, game, gameStatus, gameStarted]);

  const resetGame = () => {
    setGame(new Chess());
    // setGameStarted(false);
    setGameLocked(false);
  };

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        resetGame,
        setBlackPlayerType,
        setWhitePlayerType,
        gameStatus,
        isEngineTurn,
        gameStarted,
        setGameStarted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
