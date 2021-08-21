import React, { useState } from "react";

import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Drawer from "@material-ui/core/Drawer";

import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import SportsMmaIcon from "@material-ui/icons/SportsMma";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LoopIcon from "@material-ui/icons/Loop";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";

import ListSelection from "~/components/ListSelection";
import { WEAPONS, CHARS, PLACES } from "~/contants";

const styles = (theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    content: {
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
      overflow: "scroll",
      position: "fixed",
      top: "58px",
      bottom: "58px",
      width: "100%",
    },
    nav: {
      position: "fixed",
      bottom: 0,
      width: "100%",
    },
  });

export const Home: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const [value, setValue] = useState(0);
  const [showDrawer, setDrawer] = useState(false);
  const [chars, setChars] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [places, setPlaces] = useState([]);

  const refresh = () => {
    if (window.confirm("Deseja reiniciar os valores?")) {
      window.location.reload();
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar className={classes.header}>
          <Typography variant="subtitle1" component="h1">
            Detetive App
          </Typography>
          <div>
            <IconButton onClick={refresh}>
              <LoopIcon />
            </IconButton>
            <IconButton onClick={() => setDrawer(true)}>
              <RemoveRedEyeIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={showDrawer} onClose={() => setDrawer(false)}>
        <List>
          {[
            ...CHARS.filter((_, idx) => chars.indexOf(idx) == -1),
            ...WEAPONS.filter((_, idx) => weapons.indexOf(idx) == -1),
            ...PLACES.filter((_, idx) => places.indexOf(idx) == -1),
          ].map((value) => (
            <ListItem key={value}>{value}</ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        {value === 0 && (
          <ListSelection
            items={CHARS}
            selected={chars}
            setSelected={setChars}
          />
        )}
        {value === 1 && (
          <ListSelection
            items={WEAPONS}
            selected={weapons}
            setSelected={setWeapons}
          />
        )}
        {value === 2 && (
          <ListSelection
            items={PLACES}
            selected={places}
            setSelected={setPlaces}
          />
        )}
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.nav}
      >
        <BottomNavigationAction
          label="Suspeitos"
          icon={<DirectionsRunIcon />}
        />
        <BottomNavigationAction label="Armas" icon={<SportsMmaIcon />} />
        <BottomNavigationAction label="Lugares" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </>
  );
};

export default withStyles(styles)(Home);
