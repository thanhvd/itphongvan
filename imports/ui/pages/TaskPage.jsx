import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { TasksCollection } from "/imports/db/TasksCollection";
import { TaskForm } from "../components/Task/TaskForm";
import { TaskList } from "../components/Task/TaskList";

export const TaskPage = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5">
          📝️ To Do List
          {pendingTasksTitle}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TaskForm />
          <Box mt={2}>
            <Chip
              label={hideCompleted ? "Show All" : "Hide Completed"}
              variant="outlined"
              color="primary"
              onClick={() => setHideCompleted(!hideCompleted)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TaskList tasks={tasks} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Box>
  );
};
