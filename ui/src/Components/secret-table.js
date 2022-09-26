import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pill } from './pill';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        outerWidth: 5,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function SecretTable(props) {
    const rows = props.rows
    console.log('rows', rows);

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader={true} sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="left">Filename</StyledTableCell>
                        <StyledTableCell align="left">Matched Contents</StyledTableCell>
                        <StyledTableCell align="left">Severity</StyledTableCell>
                        <StyledTableCell align="left">Matched Part</StyledTableCell>
                        <StyledTableCell align="left">Matched Rule Name</StyledTableCell>
                        <StyledTableCell align="left">Severity Score</StyledTableCell>
                        <StyledTableCell align="left">Signature to Match</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row" >
                                <div style={{ width: '120px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {row['Image Layer ID']}
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="left" >
                                <div style={{ width: '120px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {row['Full File Name']}
                                </div>
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                <div style={{ width: '120px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {row['Matched Contents']}
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Pill severity={row.Severity} />
                            </StyledTableCell>
                            <StyledTableCell align="left">{row['Matched Part']}</StyledTableCell>
                            <StyledTableCell align="left">{row['Matched Rule Name']}</StyledTableCell>
                            <StyledTableCell align="left">{row['Severity Score']}</StyledTableCell>
                            <StyledTableCell align="left">{row['Signature to Match']}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
