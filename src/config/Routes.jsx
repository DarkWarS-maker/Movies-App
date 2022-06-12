import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";

import Signin from "../components/Login/Signin";
import Signup from "../components/Login/Signup";
import WatchList from "../components/watchlist/WatchList";
import Playlist from "../components/watchlist/Playlist";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Signup} />
      <Route path="/signup" component={Signin} />
      <Route path="/watchlist/:name" component={Playlist} />
      <Route path="/watchlist" component={WatchList} />
      <Route path="/:category/search/:keyword" component={Catalog} />
      <Route path="/:category/:id" component={Detail} />
      <Route path="/:category" component={Catalog} />
      <Route path="/home" exact component={Home} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
