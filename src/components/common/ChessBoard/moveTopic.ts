import { Topic } from "./observer";
import { IMove } from "./GameContext";
export type IMoveObserver = (Move: IMove) => void;

const moveTopic = new Topic<IMove>();

export { moveTopic };
