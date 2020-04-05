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
          <Link to="/streams/new" className="ui button primary">
            <i className="plus circle icon"></i>Create Stream
          </Link>
        </div>
      );
    }
  };

  renderAdmin = stream => {
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
  };

  renderUserList = () => {
    if (
      `/streams/user/${this.props.currentUserId}` ===
      this.props.location.pathname
    ) {
      const List = this.props.streams.map(stream => {
        if (this.props.currentUserId === stream.userId) {
          return (
            <div className="item" key={stream.id}>
              {this.renderAdmin(stream)}
              <div className="image">
                <img
                  src={stream.thumbnail}
                  alt="thumbnail"
                  style={{
                    justifyContent: "middle",
                    height: "100px",
                    width: "140px"
                  }}
                />
              </div>
              <div className="content">
                <Link to={`/streams/${stream.id}`}>
                  <div style={{ fontSize: "23px", paddingTop: "7px" }}>
                    {stream.title}
                  </div>

                  {/*React.Fragment does not have html existence so used to wrap jsx components */}
                  <div className="description">
                    <h4>{stream.description}</h4>
                    <p style={{ color: "grey" }}>
                      {stream.views} views <i className="tiny circle icon"></i>{" "}
                      {stream.status} : {stream.date}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
      if (List.length === 0) {
        return <div>Empty Homepage</div>;
      } else {
        return List;
      }
    } else {
      const List = this.props.streams.map(stream => {
        if (`/streams/user/${stream.userId}` === this.props.location.pathname) {
          return (
            <div className="item" key={stream.id}>
              <div className="image">
                <img
                  src={stream.thumbnail}
                  alt="thumbnail"
                  style={{
                    justifyContent: "middle",
                    height: "100px",
                    width: "140px"
                  }}
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
                  <div style={{ fontSize: "23px", marginTop: "10px" }}>
                    {stream.title}
                  </div>

                  {/*React.Fragment does not have html existence so used to wrap jsx components */}
                  <div className="description">
                    <h4>{stream.description}</h4>
                    <p style={{ color: "grey" }}>
                      {stream.views} views @ {stream.status} : {stream.date}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
      if (List.length === 0) {
        return <div>Empty Homepage</div>;
      } else {
        return List;
      }
    }
  };

  render() {
    return (
      console.log(this.props),
      (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Streams </h2>
            <div style={{ justifyContent: "flex-end" }}>
              {this.renderCreate()}
            </div>
          </div>
          <div className="ui celled list">{this.renderUserList()}</div>
        </div>
      )
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
