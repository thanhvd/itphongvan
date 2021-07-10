import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { Router } from "./Router";

export const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Router />
    </SnackbarProvider>
  );
};
