import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "555070020697-p6rie2mgetnp74dhdmrkg7ma5rij5r7q.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(
        this.auth.currentUser.get().getId(),
        this.auth.currentUser.get().getBasicProfile().getName()
      );
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <div>
          <button
            onClick={() => {
              this.auth.signIn();
            }}
            className="ui green google button"
          >
            Sign In
          </button>
        </div>
      );
    } else if (this.props.isSignedIn) {
      return (
        <div>
          <button
            onClick={() => {
              this.auth.signOut();
            }}
            className="ui red google button"
          >
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={() => {
              this.auth.signIn();
            }}
            className="ui green google button"
          >
            <i className="google icon" />
            Sign In
          </button>
        </div>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
