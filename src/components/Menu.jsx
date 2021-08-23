import React from "react";
import { Drawer, List, makeStyles, Toolbar } from "@material-ui/core";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Route, Switch } from "react-router-dom";
import ListItemLink from "./common/ListItemLink";
import HistoryView from "../features/exchange/HistoryView";
import OrderBook from "../features/exchange/OrderBook";
import OrderView from "../features/exchange/OrderView";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Menu() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Drawer
        className={styles.drawer}
        variant="permanent"
        classes={{
          paper: styles.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={styles.drawerContainer}>
          <List>
            {[
              { text: "Buy/Sell", to: "/buy-sell", icon:<PostAddIcon /> },
              { text: "Order Book", to: "/order-book",icon:<LibraryBooksIcon /> },
              { text: "History", to: "/history", icon:<LibraryBooksIcon /> },
            ].map((nav) => (
              <ListItemLink key={nav.text} to={nav.to} text={nav.text} icon={nav.icon} />
            ))}
          </List>
        </div>
      </Drawer>
      <main className={styles.content}>
        <Toolbar />
        <div>
          <Switch>
            <Route path="/order-book">
              <OrderBook />
            </Route>
            <Route path="/history">
              <HistoryView/>
            </Route>
            <Route path="/">
              <OrderView/>
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}
