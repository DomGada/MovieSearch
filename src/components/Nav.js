import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {!props.watchList && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => props.setHideMenu(!props.hideMenu)}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!props.watchList && (
            <Typography variant="h6" className={classes.title}>
              Find Your Movie!
            </Typography>
          )}

          {props.watchList && (
            <Typography variant="h6" className={classes.title}>
              Watch List!
            </Typography>
          )}
          {props.watchList && (
            <Button href="/" variant="contained" size="small" color="default">
              Home
            </Button>
          )}

          {!props.watchList && (
            <Button
              href="/watchlist"
              variant="contained"
              size="small"
              color="default"
            >
              Watch List
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
