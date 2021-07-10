import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TaskPage } from "./pages/TaskPage";

export const pages = [
  {
    name: "Task",
    icon: <AssignmentIcon />,
    component: TaskPage,
    path: "/task",
  },
  {
    name: "Home",
    icon: <HomeIcon />,
    component: HomePage,
    path: "/",
    exact: true,
  },
];

const PrivateRoute = ({ children, ...rest }) => {
  const user = useTracker(() => Meteor.user());
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="/login" path="/login">
          <LoginPage />
        </Route>
        <Layout>
          {pages.map((page) => (
            <PrivateRoute key={page.path} path={page.path} exact={page.exact}>
              <page.component />
            </PrivateRoute>
          ))}
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};
