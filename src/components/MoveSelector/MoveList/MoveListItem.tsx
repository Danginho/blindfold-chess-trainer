export interface IMoveListItemProps {
  move: string;
  onItemClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const MoveListItem = (props: IMoveListItemProps) => {
  const { move, onItemClick } = props;

  return (
    <div className="move-list-item-wrapper">
      <button onClick={onItemClick} className="move-list-item">
        {move}
      </button>
    </div>
  );
};
