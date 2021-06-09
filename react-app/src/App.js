import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

import SplashPage from './components/SplashPage';
import About from './components/About'
import Explore from './components/Explore';

//Testing purposes
import TestApiRoutes from "./components/TestApiRoutes";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} >
          <SplashPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/about" exact={true}>
          <About />
        </Route>
        <Route path="/explore" exact={true}>
          <Explore />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/test" exact={true}>
          <TestApiRoutes />
        </Route>
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
