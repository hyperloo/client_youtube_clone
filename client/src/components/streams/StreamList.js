import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStreams, viewInc } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link
            to={`/streams/user/${this.props.currentUserId}`}
            className="ui button primary"
          >
            <i className="home icon"></i>My Homepage
          </Link>
          <Link to="/streams/new" className="ui button primary">
            <i className="plus circle icon"></i>Create Stream
          </Link>
        </div>
      );
    }
  };

  renderAdmin = stream => {
    if (
      stream.userId === this.props.currentUserId &&
      this.props.currentUserId !== null
    ) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            <i className="edit outline icon"></i>Edit
          </Link>

          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            <i className="trash icon"></i>Delete
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <div className="image">
            <img
              src={stream.thumbnail}
              style={{ height: "90px", width: "120px" }}
              alt="thumbnail"
            />
          </div>
          <div className="content">
            <Link
              to={`/streams/${stream.id}`}
              onClick={async () => {
                const view = await stream.views;
                this.props.viewInc(stream.id, view);
              }}
            >
              <div style={{ fontSize: "23px", marginTop: "7px" }}>
                {stream.title}
              </div>

              {/*React.Fragment does not have html existence so used to wrap jsx componnts */}
              <div className="description">
                <h4 style={{ marginBottom: "0px" }}>{stream.description}</h4>
                <p style={{ color: "grey", marginTop: "0px" }}>
                  <Link to={`/streams/user/${stream.userId}`}>
                    {stream.name}
                  </Link>
                  <br />
                  {stream.views} views <i className="tiny circle icon"></i>{" "}
                  {stream.status} : {stream.date}
                </p>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Streams </h2>
          <div style={{ justifyContent: "flex-end" }}>
            {this.renderCreate()}
          </div>
        </div>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStatetoProps, {
  fetchStreams: fetchStreams,
  viewInc: viewInc
})(StreamList);
