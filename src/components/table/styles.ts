import { styled } from '@mui/material/styles';
import { TableCell, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(() => ({
  textAlign: 'center',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
}));

export const tableContainerStyles = {
  minWidth: 650,
};

export const headerCellStyles = {
  fontWeight: 'bold',
  backgroundColor: 'primary.100',
  color: 'white',
};

export const emptyCellStyles = {
  padding: '2rem',
};

export const paginationContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  mt: 2,
};

export const pageInfoStyles = {
  mr: 2,
};

export const pageSizeContainerStyles = {
  display: 'flex',
  alignItems: 'center',
};

export const pageSizeLabelStyles = {
  mr: 1,
};

export const totalRecordsStyles = {
  ml: 2,
};
