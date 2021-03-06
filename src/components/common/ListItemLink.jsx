import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { forwardRef, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function ListItemLink(props) {
  const { icon, text, to } = props;

  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={text} />
    </ListItem>
  );
}
