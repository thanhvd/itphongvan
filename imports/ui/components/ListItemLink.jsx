import React, { useMemo, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export const ListItemLink = (props) => {
  const location = useLocation();
  const { icon, primary, to } = props;

  const CustomLink = useMemo(
    () =>
      forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        component={CustomLink}
        selected={to === location.pathname}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};
