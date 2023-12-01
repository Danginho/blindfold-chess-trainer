import { moveTopic } from "./moveTopic";

class Engine extends Worker {
  private skillLevel: number;
  private depth: number;
  private thinkingTimeMs: number;
  private moveHistory: string;
  private moveDelayMs: number;

  constructor(scriptUrl: string) {
    super(scriptUrl);
    this.skillLevel = 1;
    this.depth = 7;
    this.thinkingTimeMs = 600;
    this.moveHistory = "";
    this.setNewGame();
    this.onmessage = this.handleMessage;
    this.moveDelayMs = 500;
  }

  handleMessage(message: MessageEvent): void {
    const { data } = message;

    const bestMoveMatch = data.match(
      /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/
    );

    if (bestMoveMatch) {
      setTimeout(
        () =>
          moveTopic.publish({
            from: bestMoveMatch[1],
            to: bestMoveMatch[2],
            promotion: bestMoveMatch[3],
          }),
        this.moveDelayMs
      );
    }
  }

  setNewGame() {
    this.postMessage(`ucinewgame`);
    this.postMessage(`isready`);
  }

  setMoveDelay(delayTime: number) {
    this.moveDelayMs = delayTime;
  }

  setSkillLevel(level: number) {
    this.skillLevel = level;
    this.postMessage(`setoption name Skill Level value ${this.skillLevel}`);
  }

  setDepth(level: number) {
    this.depth = level;
    this.postMessage(`setoption name Depth value ${level}`);
  }

  setThinkingTime(timeMs: number) {
    this.thinkingTimeMs = timeMs;
  }

  setMoveHistory(moveHistory: string) {
    this.moveHistory = moveHistory;
    this.postMessage("position startpos moves" + " " + this.moveHistory);
  }

  replyToPosition() {
    this.postMessage(`go depth ${this.depth} movetime ${this.thinkingTimeMs}`);
  }
}

export const Stockfish = new Engine("stockfish.js");
