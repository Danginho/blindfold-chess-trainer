import { Board } from "../../common/ChessBoard/Board";
import styles from "./PlayChess.module.scss";
console.log(styles);

export const PlayChess = () => {
  // const { engine } = useContext(EngineContext);
  console.log("Rendered");
  // Will be queued and sent to the worker once initialized

  return (
    <div className={styles.container}>
      <div className={styles.chessboard}>
        <Board />
      </div>
      <div className={styles.movehistory}>hi</div>
    </div>
  );
};
