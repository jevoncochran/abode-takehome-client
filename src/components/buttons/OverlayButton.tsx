import Button from "@mui/material/Button";

interface Props {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const OverlayButton = ({ label, onClick }: Props) => {
  return (
    <Button variant="overlay" sx={{ color: "#FFF" }} onClick={onClick}>
      {label}
    </Button>
  );
};

export default OverlayButton;
