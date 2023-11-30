import "./StyledButton.scss";

export interface IButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const StyledButton = (props: IButtonProps) => {
  const { onClick, text } = props;

  return (
    <div className="button-wrapper">
      <button className="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
