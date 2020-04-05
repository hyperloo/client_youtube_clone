import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  //props object is passed down from react-router-dom as they are called by Route component
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(
            this.props.stream,
            "title",
            "description",
            "about",
            "thumbnail",
            "video"
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //ownProps are props passed to StreamEdit
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream: fetchStream,
  editStream: editStream
})(StreamEdit);
