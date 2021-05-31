import React, { useState, useEffect } from 'react';
import { TextField, Select, FormControl, MenuItem, InputLabel, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: 100,
        color: '#fff',
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    formLabel: {
        backgroundColor: "#fff",
        color: '#000',
        padding: 5,
        borderRadius: 5
    },
    inputField: {
        margin: theme.spacing(1),
        width: "100%",
        color: '#fff',
        backgroundColor: "#fff",
        borderRadius: 10,
        '& .Mui-focused': {
            backgroundColor: "#fff",
            color: '#000',
            padding: 5,
            borderRadius: 5
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}));

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Fields = [
    {
        label: "Type",
        name: "type",
        options: ["Autobot", "Decepticon"]
    },
    {
        label: "Strength",
        name: "strength",
        options,
    },
    {
        label: "Endurance",
        name: "endurance",
        options,
    },
    {
        label: "Firepower",
        name: "firepower",
        options,
    },
    {
        label: "Intelligence",
        name: "intelligence",
        options,
    },
    {
        label: "Rank",
        name: "rank",
        options,
    },
    {
        label: "Skill",
        name: "skill",
        options,
    },
    {
        label: "Speed",
        name: "speed",
        options,
    },
    {
        label: "Courage",
        name: "courage",
        options,
    },
];

const initialData = {
    name: "",
    strength: 1,
    type: "Autobot",
    endurance: 1,
    firepower: 1,
    intelligence: 1,
    rank: 1,
    skill: 1,
    speed: 1,
    courage: 1,
    killedInBattle: false,
}

export const AddWarrior = ({ updateWarriors, warriors }) => {
    const [data, setData] = useState(initialData);
    const [hasError, setError] = useState(false);

    const handleChange = (e, name) => {
        setData(prevData => ({ ...prevData, [name]: e.target.value }));
    };

    const handleNameChange = (e) => {
        setData(prevData => ({ ...prevData, name: e.target.value }));
        setError(e.target.value.length !== 0 ? false : true);
    };

    const handleWarrior = () => {
        if (data.name.length !== 0) {
            updateWarriors(prevWarriors => ([...prevWarriors, { ...data }]));
            setData(initialData);
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        warriors.length === 0 && setError(false);
    }, [warriors])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6} >
                    <TextField className={classes.inputField} label="Warrior Name" variant="outlined" onChange={handleNameChange} error={hasError} value={data.name} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {Fields.map(field => (
                    <Grid item xs={6} sm={4} lg={2}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel className={classes.formLabel}>{field.label}</InputLabel>
                            <Select
                                labelWidth={50}
                                value={data[field.name]}
                                onChange={e => handleChange(e, field.name)}
                            >
                                {field.options.map(option => (<MenuItem value={option}>{option}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                ))}
            </Grid>
            <Grid>
                <Button variant="contained" className={classes.button} onClick={handleWarrior} color="secondary">Add Warrior</Button>
            </Grid>
        </div >
    );
}
