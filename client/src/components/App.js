import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamUser from "./streams/StreamUser";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <h1>
          <Header />
        </h1>
        <div>
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />{" "}
            {/*this /:id is called wildcard 
             and /:id can take any value string */}
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
            <Route path="/streams/user/:id" exact component={StreamUser} />
          </Switch>
        </div>
      </Router>
      <h4>
        
      </h4>
    </div>
  );
};

export default App;
