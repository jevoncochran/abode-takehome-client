import Button from "@mui/material/Button";

interface Props {
  label: string;
  width: "small" | "medium" | "large";
}

const buttonWidth = {
  small: "100px",
  medium: "50%",
  large: "100%",
};

const PrimaryButton = ({ label, width }: Props) => {
  return (
    <Button
      variant="contained"
      sx={{ width: buttonWidth[width], color: "#FFF" }}
      type="submit"
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
