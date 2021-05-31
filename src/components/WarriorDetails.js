import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        margin: theme.spacing(0),
        textAlign: "center"
    },
    tableContainer: {
        width: "auto",
        margin: theme.spacing(5),
    },
    tableCell: {
    },
    tableBody: {

    },
    button: {
        margin: theme.spacing(1),
    }
}));

export const WarriorDetails = ({ warriors }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            {
                warriors.length ? <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Name</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Type</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Strength</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Endurance</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Firepower</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Intelligence</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Rank</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Skill</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Speed</TableCell>
                                <TableCell align="left" className={classes.tableCell}>Courage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {warriors.map(({ name, strength, type, endurance, firepower, intelligence, rank, skill, speed, courage }) => (
                                <TableRow key={name}>
                                    <TableCell component="th" className={classes.tableCell}>
                                        {name}
                                    </TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{type}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{strength}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{endurance}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{firepower}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{intelligence}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{rank}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{skill}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{speed}</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>{courage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : ""
            }

        </Grid>
    )
};
