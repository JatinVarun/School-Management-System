import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled table cell
const StyledTableCell = styled('td')(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    borderBottom: '1px solid #ddd',
    padding: '16px',
    '&:first-of-type': {
        borderLeft: '1px solid #ddd',
    },
    '&:last-of-type': {
        borderRight: '1px solid #ddd',
    },
}));

// Custom styled table row
const StyledTableRow = styled('tr')(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#f5f5f5', // Change the hover color for the row
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Adds striped effect on odd rows
    },
}));

// Custom styled table header
const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
    backgroundColor: '#1976d2', // Change header background color
    color: theme.palette.common.white, // Change header text color
    fontWeight: 'bold', // Make header text bold
    borderBottom: '2px solid #ddd', // Add a thicker border for the header
}));

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column, index) => (
                                <StyledTableHeaderCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableHeaderCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={index} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 5));
                    setPage(0);
                }}
            />
        </>
    );
};

export default TableViewTemplate;
