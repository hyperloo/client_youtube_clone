import React from "react";
import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderContent = () => {
    if (!this.props.stream) {
      return "Are You Sure, you want to delete this stream? ...";
    }
    return `Are you sure you want to delete ${this.props.stream.title} ?`;
  };
  render() {
    return (
      <Modal
        title="Delete a Stream"
        description={this.renderContent()}
        deleteStream={() => this.props.deleteStream(this.props.match.params.id)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //ownProps are props passed to StreamEdit
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream: fetchStream,
  deleteStream: deleteStream
})(StreamDelete);
