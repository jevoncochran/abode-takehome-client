import { HTMLInputTypeAttribute } from "react";
// Material UI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

interface Props {
  inputName: string;
  label?: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  startAdornment?: JSX.Element;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGrouping = ({
  inputName,
  label,
  value,
  type,
  placeholder,
  onChange,
}: Props) => {
  return (
    <Box width="100%" sx={{ marginBottom: "24px" }}>
      {label && <InputLabel sx={{ marginBottom: "12px" }}>{label}</InputLabel>}
      <TextField
        name={inputName}
        value={value ?? ""}
        type={type}
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: false }}
        placeholder={value ? "" : placeholder}
        onChange={onChange}
      />
    </Box>
  );
};

export default InputGrouping;
