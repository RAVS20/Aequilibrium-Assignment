import React from 'react';
import { Button, Grid } from "@material-ui/core";
import { TransformationCompany } from "./components/TransformationCompany";
import { CastleCompany } from "./components/CastleCompany";
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttons: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <div >
      <Router>
        <Grid className={classes.buttons}>
          <Link to="/castle"><Button className={classes.button} variant="contained" color="primary" >The Castle Company</Button></Link>
          <Link to="/transformers"><Button className={classes.button} variant="contained" color="primary" >The Transformation Company</Button></Link>
        </Grid>
        <Switch>
          <Route path="/castle">
            <CastleCompany />
          </Route>
          <Route path="/transformers">
            <TransformationCompany />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
