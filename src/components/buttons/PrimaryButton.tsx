import Button from "@mui/material/Button";

interface Props {
  label: string;
  width: "small" | "medium" | "large";
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const buttonWidth = {
  small: "100px",
  medium: "50%",
  large: "100%",
};

const PrimaryButton = ({ label, width, type = "submit", onClick }: Props) => {
  return (
    <Button
      variant="contained"
      sx={{ width: buttonWidth[width], color: "#FFF" }}
      type={type}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
