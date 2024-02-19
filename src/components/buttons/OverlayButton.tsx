import Button from "@mui/material/Button";

interface Props {
  label: string;
}

const OverlayButton = ({ label }: Props) => {
  return (
    <Button variant="overlay" sx={{ color: "#FFF" }}>
      {label}
    </Button>
  );
};

export default OverlayButton;
