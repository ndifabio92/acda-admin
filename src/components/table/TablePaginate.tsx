import { Box, IconButton, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import {
  paginationContainerStyles,
  pageInfoStyles,
  pageSizeContainerStyles,
  pageSizeLabelStyles,
  totalRecordsStyles,
} from './styles';

interface Props {
  pageCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  pageSizeOptions?: number[];
  totalElements: number;
}

const TablePagination = ({
  pageCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50],
  totalElements,
}: Props) => {
  const handleBackButtonClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = event.target.value as number;
    onPageSizeChange(newPageSize);
  };

  return (
    <Box sx={paginationContainerStyles}>
      <Typography sx={pageInfoStyles}>
        Página {currentPage} de {pageCount}
      </Typography>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={currentPage === 1}
        aria-label="página anterior"
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={currentPage === pageCount}
        aria-label="página siguiente"
      >
        <NavigateNextIcon />
      </IconButton>
      <Box sx={pageSizeContainerStyles}>
        <Typography sx={pageSizeLabelStyles}>Filas por página:</Typography>
        <Select size="small" value={pageSize} onChange={handlePageSizeChange}>
          {pageSizeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Typography sx={totalRecordsStyles}>Total de Registros: {totalElements}</Typography>
    </Box>
  );
};

export default TablePagination;
