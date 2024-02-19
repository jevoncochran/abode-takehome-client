import Button from "@mui/material/Button";

interface Props {
  label: string;
}

const SecondaryButton = ({ label }: Props) => {
  return <Button variant="outlined">{label}</Button>;
};

export default SecondaryButton;
