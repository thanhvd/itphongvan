import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task";
import { TasksCollection } from "/imports/db/TasksCollection";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call("tasks.setIsChecked", _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

export const App = () => {
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

  const logout = () => Meteor.logout();

  return (
    <>
      <CssBaseline />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>
                📝️ To Do List
                {pendingTasksTitle}
              </h1>
            </div>
          </div>
        </header>

        <div className="main">
          {user ? (
            <>
              <div className="user" onClick={logout}>
                {user.username} 🚪
              </div>

              <TaskForm user={user} />

              <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? "Show All" : "Hide Completed"}
                </button>
              </div>

              {isLoading && <div className="loading">loading...</div>}

              <ul className="tasks">
                {tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                  />
                ))}
              </ul>
            </>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
