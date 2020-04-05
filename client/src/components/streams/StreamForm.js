import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta, extraLabel }) => {
    // reduxForm function returns Props (consisting property of the form) to the <form></form> which are passed to the <Field/>
    // which is further passed on to input as Props
    // This Props is further destructured into { input, label } where input is property from reduxForm and label is set by us
    const classname = `field ${meta.error && meta.touched ? "error" : ""}`; // we can also put !active && touched

    return (
      <div className={classname}>
        <label>{label}</label>
        {label === "Enter Description" ? (
          <textarea {...input} autoComplete="off" placeholder={extraLabel} />
        ) : (
          <input {...input} autoComplete="off" placeholder={extraLabel} />
        )}
        {meta.touched && meta.error ? (
          <div className="ui error message">
            <div className="header">{meta.error}</div>
          </div>
        ) : (
          <div></div>
        ) /*This error is automatically fetched from 'errors' object based on Field name property */}
      </div>
    ); //this {...Props.input} syntax automatically return property including
    // onChange = { Props.input.onChange } value = { Props.input.value } and many other with the same name and pass them
    // as props to input
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          extraLabel="Title"
        />
        <Field
          name="about"
          component={this.renderInput}
          label="Enter About"
          extraLabel="About"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
          extraLabel="Description"
        />
        <Field
          name="thumbnail"
          component={this.renderInput}
          label="Enter Link to thumbnail"
          extraLabel="Thumbnail Link"
        />
        <Field
          name="video"
          component={this.renderInput}
          label="Enter Link to video"
          extraLabel="Video Link"
        />

        <button
          onClick={this.props.handleSubmit(this.onSubmit)}
          className="ui button primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    // name of errors.component must be same as name = "title" of <Field/> in form
    errors.title = "You must enter a title";
  }

  if (!formValues.about) {
    // name of errors.component must be same as name = "about" of <Field/> in form
    errors.about = "You must enter a about";
  }
  if (!formValues.description) {
    // name of errors.component must be same as name = "about" of <Field/> in form
    errors.description = "You must enter a description";
  }
  if (!formValues.thumbnail) {
    // name of errors.component must be same as name = "about" of <Field/> in form
    errors.thumbnail = "You must enter a thumbnail";
  }
  if (!formValues.video) {
    // name of errors.component must be same as name = "about" of <Field/> in form
    errors.video = "You must enter a video";
  }
  return errors;
};

/*
  to connect redux-form and normal reducers at same time, we can use syntax like :

  export default connect(null,{ createStream : createStream //ACTION CREATOR})(reduxForm({ 
  form: "streamForm",
  validate: validate
})(StreamForm);)

                      OR 
                      |
                      |
                      |
                     ````
                      ```
                       `
*/

export default reduxForm({
  form: "streamForm", // here form is a keyword and the string "streamForm" is name of the form
  // form is a keyword property of state (redux-from ) in reducers whose one element is this { form : with name "streamForm"}
  // Prefer Redux Debugger. this form has components under <form></form>
  validate: validate
})(StreamForm);
