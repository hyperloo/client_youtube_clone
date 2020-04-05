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

      <br />
      <div className="ui row">
        <div className="ui segment">
          <div className="ui large header">Description of the app</div>
          <div class="ui divider"></div>
          <div className="ui medium header">Developed By Himanshu</div>
          <br />
          <div className="ui segment">
            This App is A <b>Youtube Clone</b> type App made using <b>React</b>,{" "}
            <b>Redux</b>,<b>Redux-forms</b>, <b>axios</b> for fetching data and{" "}
            <b>JsonDB</b> as a Development DB.
            <br />
            This App also uses <b>Google Authentication</b>(Google Auth) fro
            authentication purpose.
            <br />
            <br />
            This app has following features:
            <br />
            1. This App shows the all created video list with
            <br />
            {"  "} ->a. Video Name <br />
            {"  "} ->b. Video Description
            <br />
            {"  "} ->c. Creator's Name
            <br />
            {"  "} ->d. Views and Creation Date
            <br />
            {"  "} ->e. Thumbnail
            <br />
            2. On Clicking Any video, you will be navigated to that video with
            Video's full description and More Videos At the bottom of
            description.
            <br />
            3. On Clicking the Creator's Name, you will be navigated to his user
            homepage with his profile videos.
            <br />
            4. You can Sign In using Google Account.
            <br />
            5. After Sign In, you have authority to create videos
            <br />
            6. And You will also see button through which you can perform
            update/delete operations
            <br />
            7. User can also see his homepage by clicking "homepage" button.
            <b>Note</b>: This app is responsiveness to the screen but not that
            much good it was a learning app.
            <br />
            <br />
            Explore more.....
            <br />
            <div class="content">
              Portfolio ...
              <a href="http://tekin2.tk/" target="_blank">
                {" "}
                http://tekhin2.tk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
