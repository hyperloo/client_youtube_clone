import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import history from "./../history";

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      onClick={() => history.push("/")}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        {/* onClick={() => history.push("/")} ==> this helps to  propagate to homepage on clicking anywhere
        outside the modal card but on the other hand even when one mistakengly clicks anywhere else ont 
        the modal card still it propagates to homepages as "By DEFAULT javascript behaviour" is that the
        parent event handler applies also to child
        
        To prevent this, we define an onClick {(e) => e.stopPropagation()} callback which prevent this propagation
        behaviour of child component
        */}
        <div className="header">{props.title}</div>
        <div className="image">{props.thumbnail}</div>
        <div className="content">{props.description}</div>
        <div className="actions">
          <button onClick={props.deleteStream} className="ui negative button">
            Delete
          </button>
          <Link to="/" className="ui primary button">
            Cancel
          </Link>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
