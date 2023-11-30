import { moveTopic } from "../../common/ChessBoard/moveTopic";
import { MoveListItem } from "./MoveListItem";

interface IMoveListProps {
  availableMoves: string[];
  filter: string;
  className?: string;
}

export const MoveList = (props: IMoveListProps) => {
  const { availableMoves, filter, className } = props;

  const onItemClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const move = e.currentTarget.innerText;
    moveTopic.publish(move);
  };

  const filteredMoves = availableMoves.filter((move: string) =>
    move.toLowerCase().includes(filter.toLowerCase())
  );

  const moveList = filteredMoves.map((move: string) => (
    <MoveListItem onItemClick={onItemClick} move={move} key={move} />
  ));

  return <div className={className || ""}>{moveList}</div>;
};
