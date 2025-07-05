import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const SearchField = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  width = '500px',
  onKeyDown,
}: Props) => {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{ width }}
    />
  );
};
