import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import StreamList from "./StreamList";

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

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
  render() {
    if (!this.props.stream) return <div>Loading..!</div>; //this is for first time when render is called
    //then-after only componentDidMount() is called which fetches the stream which is then updated in
    // state in store which is then passed to mapStateToProps() which then passes it as a prop to the class
    return (
      <div style={{ margin: "auto 25px", marginBottom: "50px" }}>
        <iframe
          style={{ width: "100%", height: "600px", marginBottom: "20px" }}
          src={`${this.props.stream.video}`}
          frameBorder={"0"}
          title={`${this.props.stream.video}`}
        ></iframe>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ marginBottom: "0px" }}>{this.props.stream.title}</h1>
            <h5 style={{ color: "grey", marginTop: "0px" }}>
              {this.props.stream.views} views{" "}
              <i className="tiny circle icon"></i> {this.props.stream.status} :{" "}
              {this.props.stream.date}
            </h5>
          </div>
          {this.props.stream.userId === this.props.currentUserId
            ? this.renderAdmin(this.props.stream)
            : null}
        </div>

        <h3>{this.props.stream.about}</h3>
        <div className="ui divider"></div>
        <div className="details" style={{ display: "flex" }}>
          <img
            className="ui avatar image"
            src={this.props.stream.thumbnail}
            alt="thumbnail"
            style={{ width: "130px", height: "100px" }}
          />{" "}
          <div style={{ display: "inline-block", margin: "auto 15px" }}>
            <Link
              to={`/streams/user/${this.props.stream.userId}`}
              style={{ color: "black", fontSize: "20px", marginBottom: "30px" }}
            >
              <p>@ {this.props.stream.name}</p>
            </Link>
            {this.props.stream.description}
          </div>
        </div>
        <div className="ui divider"></div>

        <StreamList />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
