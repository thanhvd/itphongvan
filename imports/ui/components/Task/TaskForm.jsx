import { Meteor } from "meteor/meteor";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useSnackbar } from "notistack";

const schema = yup.object().shape({
  text: yup.string().required().label("Task Name"),
});

export const TaskForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ text }) => {
    Meteor.call("tasks.insert", text, (error) => {
      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Add task successfully", { variant: "success" });
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={2}>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Task Name"
              fullWidth
              error={Boolean(errors.text?.message)}
              helperText={errors.text?.message}
            />
          )}
        />
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </form>
  );
};
