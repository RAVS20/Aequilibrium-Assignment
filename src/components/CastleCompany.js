import React, { useState } from 'react';
import { TextField, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(3),
    },
    inputField: {
        margin: theme.spacing(1),
        width: "100%",
        color: '#fff',
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    button: {
        margin: theme.spacing(1),
    },
    result: {
        margin: theme.spacing(1)
    }
}));

export const CastleCompany = () => {
    const [hasError, setError] = useState(false);
    const [data, setData] = useState("");
    const [showResult, setResult] = useState(false);
    const [castles, setCastles] = useState(0);
    const [locations, setLocations] = useState([]);

    const handleChange = (e) => {
        setData(e.target.value);
        setError(e.target.value.length !== 0 ? false : true);
    };

    const calculateCastles = () => {
        if (!data) {
            setError(true);
            return;
        }
        let heights = data.split(',').map(i => Number(i));
        heights = removeDuplicates(heights, 0);
        let castleLocations = [heights[0]];
        let count = 2;//castle at the start and castle at the end
        for (let i = 1; i < heights.length - 1; i++) {
            if (heights[i] < heights[i - 1] && heights[i] < heights[i + 1]) {//valley
                count++;
                castleLocations.push(heights[i]);
            } else if (heights[i] > heights[i - 1] && heights[i] > heights[i + 1]) {//peak
                count++;
                castleLocations.push(heights[i]);
            }
        }
        castleLocations.push(heights[heights.length - 1]);
        setResult(true);
        setCastles(count);
        setLocations(castleLocations);
    };
    const removeDuplicates = (nums, i) => {
        if (nums[i + 1] === undefined) {
            return nums;
        }
        if (nums[i] === nums[i + 1]) {
            nums.splice(i + 1, 1);
            return removeDuplicates(nums, i);
        } else {
            return removeDuplicates(nums, i + 1);
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} >
                <Grid item xs={12} lg={6} >
                    <TextField className={classes.inputField} label="Land Details" variant="outlined" onChange={handleChange} error={hasError} value={data} helperText="Enter data separated by comma(,) ex:6,1,4" />
                    <Button variant="contained" className={classes.button} color="secondary" onClick={calculateCastles}>Find # Castles</Button>
                    {showResult && <Grid>
                        <Typography className={classes.result}># Castles Can be built : {castles} (assuming each castle at the start and end)</Typography>
                        <Typography className={classes.result}>Locations:</Typography>
                        {locations.map(location => <Typography className={classes.result}>{location}  </Typography>)}
                    </Grid>}
                </Grid>
            </Grid>
        </div>
    )
}

export default CastleCompany;
