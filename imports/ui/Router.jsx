import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TaskPage } from "./pages/TaskPage";

const pages = [
  {
    name: "Task",
    component: TaskPage,
    path: "/task",
  },
  {
    name: "Home",
    component: HomePage,
    path: "/",
  },
];

function PrivateRoute({ children, ...rest }) {
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
}

export const Router = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            {pages.map((page) => (
              <li key={page.path}>
                <Link to={page.path}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Switch>
          {!user && (
            <Route key="/login" path="/login">
              <LoginPage />
            </Route>
          )}
          {pages.map((page) => (
            <PrivateRoute key={page.path} path={page.path}>
              <page.component />
            </PrivateRoute>
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  );
};
