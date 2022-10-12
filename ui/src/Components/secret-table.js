import * as React from 'react';
import { Pill } from './pill';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PrivacyTipTwoToneIcon from '@mui/icons-material/PrivacyTipTwoTone';
import SafetyCheckTwoToneIcon from '@mui/icons-material/SafetyCheckTwoTone';
import CircularProgress from '@mui/material/CircularProgress';

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

    const { loadingRows, rows, handleClickOpen } = props

    const styles = {
        landingBox: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'calc(100vh - 25em)'
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 700, opacity: rows ? '100%' : '10%' }} aria-label="customized table">
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
                    {rows && rows.map((row) => (
                        <StyledTableRow key={row.name} onClick={() => handleClickOpen(row)} sx={{
                            cursor: 'pointer',
                        }}>
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

            {loadingRows &&
                <Box sx={styles.landingBox}>
                    <CircularProgress />
                    <Typography variant="body1" color="text.secondary" sx={{ marginTop: '10px' }}>
                        Image scan in progress...
                    </Typography>
                </Box>
            }

            {rows?.length === 0 &&
                <Box sx={styles.landingBox}>
                    <PrivacyTipTwoToneIcon color='primary' sx={{ fontSize: '100px' }} />
                    <Typography variant="h3" color="text.secondary" sx={{ mt: 0 }}>
                        No results found
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0 }}>
                        Please retry your scan or select a new image from the dropdown.
                    </Typography>
                </Box>
            }

            {!rows && !loadingRows &&
                <Box sx={styles.landingBox}>
                    <SafetyCheckTwoToneIcon color='primary' sx={{ fontSize: '100px' }} />
                    <Typography variant="h3" color="text.secondary" sx={{ mt: 0 }}>
                        Start a new scan
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0 }}>
                        Select the image from the dropdown and scan for secrets.
                    </Typography>
                </Box>
            }

        </TableContainer>
    );
}
