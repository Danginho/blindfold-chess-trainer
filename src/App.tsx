import { GameProvider } from "./components/common/ChessBoard/GameContext";
import { PlayChess } from "./components/features/PlayChess/PlayChess";
function App() {
  return (
    <>
      <div className="base-header"></div>
      <div className="base-container">
        <GameProvider>
          <PlayChess />
        </GameProvider>
      </div>
    </>
  );
}

export default App;
