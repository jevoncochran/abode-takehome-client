import Button from "@mui/material/Button";

interface Props {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SecondaryButton = ({ label, onClick }: Props) => {
  return (
    <Button variant="outlined" onClick={onClick}>
      {label}
    </Button>
  );
};

export default SecondaryButton;
