import { moveTopic } from "../../common/ChessBoard/moveTopic";

interface InputFieldProps {
  inputRef: React.RefObject<HTMLInputElement>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  availableMoves: string[];
  className: string;
}

export const MoveInput = (props: InputFieldProps) => {
  const { inputRef, filter, setFilter, availableMoves, className } = props;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Check if the lowercase version of the input string is a valid move
      if (availableMoves.length === 1) {
        moveTopic.publish(availableMoves[0]);
        setFilter("");
        inputRef.current?.focus;
      }

      if (
        availableMoves.some(
          (move: string) => move.toLowerCase() === filter.toLowerCase()
        )
      ) {
        // Find the correctly-cased move
        const correctCaseMove = availableMoves.find(
          (move: string) => move.toLowerCase() === filter.toLowerCase()
        );

        // If found, make the move
        if (correctCaseMove) {
          moveTopic.publish(correctCaseMove);
          setFilter("");
          inputRef.current?.focus;
        }
      }
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={filter}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(e.target.value)
      }
      onKeyDown={handleKeyDown} // Add this line
      className={className || ""}
      placeholder="Filter moves"
    />
  );
};
