import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    Meteor.call("tasks.insert", text);

    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField
          label="Type to add new tasks"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </form>
  );
};
