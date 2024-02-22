import Button from "@mui/material/Button";

interface Props {
  label: string;
  width: "small" | "medium" | "large";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const buttonWidth = {
  small: "100px",
  medium: "50%",
  large: "100%",
};

const DeleteButton = ({ label, width, onClick }: Props) => {
  return (
    <Button
      variant="delete"
      sx={{ width: buttonWidth[width], color: "#FFF" }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default DeleteButton;
