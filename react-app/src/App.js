import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User/User";
import { authenticate } from "./store/session";

import Collection from './components/Collection';
import Favorite from "./components/Favorite";
import Quote from "./components/Quote"
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
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/quotes" exact={true} >
          <Quote />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/favorites" exact={true} >
        <Favorite />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/collections" exact={true} >
        <Collection />
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
