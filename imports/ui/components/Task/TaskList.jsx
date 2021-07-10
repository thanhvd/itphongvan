import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { TaskListItem } from "./TaskListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TaskList = ({ tasks }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {tasks.map((task) => (
        <TaskListItem key={task._id} task={task} />
      ))}
    </List>
  );
};
