import { Meteor } from "meteor/meteor";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call("tasks.setIsChecked", _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

export const TaskListItem = ({ task }) => {
  const handleCheck = () => toggleChecked(task);
  const handleDelete = () => deleteTask(task);

  return (
    <ListItem
      key={task._id}
      role={undefined}
      dense
      button
      onClick={handleCheck}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          value={task._id}
          checked={task.isChecked}
          tabIndex={-1}
          disableRipple
          color="primary"
          defaultValue={task._id}
        />
      </ListItemIcon>
      <ListItemText primary={task.text} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleDelete}>
          <RemoveCircleIcon color="secondary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
