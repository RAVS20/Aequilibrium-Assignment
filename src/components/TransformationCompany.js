import React, { useState } from 'react';
import { AddWarrior } from './AddWarrior';
import { WarriorDetails } from "./WarriorDetails";
import { Button, Grid, Typography } from "@material-ui/core";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    buttons: {
        margin: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(2),
    },
    result: {
        color: '#fff',
        margin: theme.spacing(5)
    }
}));

export const TransformationCompany = () => {

    const [warriors, setWarriors] = useState([]);
    const [showResult, setResult] = useState(false);
    const [showError, setError] = useState(false);
    const [noOfBattles, setNoOfBattles] = useState(0);
    const [winner, setWinner] = useState({});
    const [loser, setLoser] = useState({});
    const [isTie, setTie] = useState(false);

    const sortWarriorsByRank = warriors => {
        let sortedWarriors = warriors.sort((a, b) => (b.rank - a.rank));
        return sortedWarriors.map(warrior => {
            const { strength, endurance, firepower, intelligence, speed } = warrior;
            warrior['overallRating'] = strength + intelligence + speed + endurance + firepower;
            return warrior;
        })
    };

    const startWar = () => {
        let autobotsTeam = [], decepticonsTeam = [], battlesCount = 0;

        warriors.forEach(warrior => {
            if (warrior.type === "Autobot") {
                autobotsTeam.push(warrior)
            } else {
                decepticonsTeam.push(warrior)
            }
        })

        if (autobotsTeam.length === 0 || decepticonsTeam.length === 0) {
            setError(true);
            return;
        }

        autobotsTeam = sortWarriorsByRank(autobotsTeam);
        decepticonsTeam = sortWarriorsByRank(decepticonsTeam);
        battlesCount = autobotsTeam.length >= decepticonsTeam.length ? decepticonsTeam.length : autobotsTeam.length;

        const { autobots, decepticons, gameEndIndex } = determineWinner(autobotsTeam, decepticonsTeam, battlesCount);

        let survivedAutobots = autobots.filter(({ killedInBattle }) => !killedInBattle);
        let survivedDecepticons = decepticons.filter(({ killedInBattle }) => !killedInBattle);
        if (survivedAutobots.length > survivedDecepticons.length) {
            setNoOfBattles(gameEndIndex);
            setResult(true);
            setTie(false);
            setError(false);
            setWinner({ name: "Autobots", members: autobots });
            setLoser({ name: 'Decepticons', members: survivedDecepticons });
        } else if (survivedAutobots.length < survivedDecepticons.length) {
            setNoOfBattles(gameEndIndex);
            setResult(true);
            setTie(false);
            setError(false);
            setWinner({ name: 'Decepticons', members: decepticons });
            setLoser({ name: "Autobots", members: survivedAutobots });
        } else {
            setTie(true);
        }

    };

    const determineWinner = (autobots, decepticons, battlesCount) => {
        let isGameEnd = false, gameEndIndex;
        for (let i = 0; i < battlesCount; i++) {
            let w1 = autobots[i], w2 = decepticons[i];
            if ((w1.name.toLowerCase() === "optimus prime" && w2.name.toLowerCase() === "predaking") || (w1.name.toLowerCase() === "predaking" && w2.name.toLowerCase() === "optimus prime") || (w1.name.toLowerCase() === "optimus prime" && w2.name.toLowerCase() === "optimus prime") || (w1.name.toLowerCase() === "predaking" && w2.name.toLowerCase() === "predaking")) {
                isGameEnd = true;
                gameEndIndex = i + 1;
                w1.killedInBattle = true;
                w2.killedInBattle = true;
                break;
            } else if ((w1.name.toLowerCase() === "optimus prime" && (w2.name.toLowerCase() !== "optimus prime" && w2.name.toLowerCase() !== "predaking")) || (w1.name.toLowerCase() === "predaking" && (w2.name.toLowerCase() !== "optimus prime" && w2.name.toLowerCase() !== "predaking"))) {
                w2.killedInBattle = true;
            } else if ((w2.name.toLowerCase() === "optimus prime" && (w1.name.toLowerCase() !== "optimus prime" && w1.name.toLowerCase() !== "predaking")) || (w2.name.toLowerCase() === "predaking" && (w1.name.toLowerCase() !== "optimus prime" && w1.name.toLowerCase() !== "predaking"))) {
                w1.killedInBattle = true;
            } else if (((w1.courage - w2.courage >= 4) && (w1.strength - w2.strength >= 3)) || (w1.skill - w2.skill >= 3)) {
                w2.killedInBattle = true;
            } else if (((w2.courage - w1.courage >= 4) && (w2.strength - w1.strength >= 3)) || (w2.skill - w1.skill >= 3)) {
                w1.killedInBattle = true;
            } else if (w1.overallRating > w2.overallRating) {
                w2.killedInBattle = true;
            } else if (w1.overallRating < w2.overallRating) {
                w1.killedInBattle = true;
            } else {
                w1.killedInBattle = true;
                w2.killedInBattle = true;
            }
        }

        if (!isGameEnd) {
            gameEndIndex = battlesCount;
        }

        return {
            autobots,
            decepticons,
            gameEndIndex
        }

    }
    const handleReset = () => {
        setWarriors([]);
        setResult(false);
        setError(false);
        setNoOfBattles(0);
        setTie(false);
    };

    const classes = useStyles();

    return (
        <div >
            <div className="TransformationCompany"></div>
            <AddWarrior updateWarriors={setWarriors} warriors={warriors} />
            {showResult && <Grid className={classes.result}>
                <Typography>{noOfBattles} battle(s)</Typography>
                <br />
                <Typography>Winning Team({winner.name}):</Typography>
                {winner.members.map(({ name }) => <Typography>{name}</Typography>)}
                <br />
                <Typography>Survivors from losing Team({loser.name}):</Typography>
                {loser.members.length > 0 ? loser.members.map(({ name }) => <Typography>{name}</Typography>) : 'No Survivors'}
            </Grid>}
            {showError && <Typography className={classes.result}>Add atleast one warrior from other type</Typography>}
            {isTie && <Typography className={classes.result}>No Winner Since it's a tie</Typography>}
            <WarriorDetails warriors={warriors} />
            <Grid className={classes.buttons}>
                {warriors.length >= 2 && <Button className={classes.button} variant="contained" color="primary" onClick={handleReset}>Reset</Button>}
                {warriors.length >= 2 && <Button className={classes.button} variant="contained" color="primary" onClick={startWar}>Start War</Button>}
                <br />
            </Grid>
        </div>
    );
}

export default TransformationCompany;
