import React from "react";
import Button from "@material-ui/core/Button";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onDeleteClick(task)}
      >
        &times;
      </Button>
    </li>
  );
};
