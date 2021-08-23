import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import TotalFee from "./TotalFee";


const useStyles = makeStyles((theme) => ({
    toolBar: {
    display: "flex",
    justifyContent: "space-between"
   },
   appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  }));

export default function HeaderApp() {
    const styles = useStyles();
  return (
    <AppBar position="fixed"  className={styles.appBar} >
      <Toolbar className={styles.toolBar}>
        <Typography variant="h6" noWrap>
          BINANCE
        </Typography>
        <TotalFee />
      </Toolbar>
    </AppBar>
  );
}
