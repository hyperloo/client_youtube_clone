import streams from "../apis/stream";
import history from "../history";

export const signIn = (userId, userName) => {
  return {
    type: "SIGN_IN",
    payload: userId,
    name: userName
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

const getCurrentDate = (separator = "") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}:${month < 10 ? `0${month}` : `${month}`}:${year}`;
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId, name } = getState().auth;
  const status = "Created on ";
  const date = getCurrentDate();
  const views = 0;

  const response = await streams.post("/streams", {
    ...formValues,
    userId,
    status,
    date,
    name,
    views
  });

  dispatch({ type: "CREATE_STREAM", payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");

  dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: "FETCH_STREAM", payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  //const response = await streams.put(`/streams/${ id }`, formValues);
  const status = "Updated on ";
  const date = getCurrentDate();
  const response = await streams.patch(`/streams/${id}`, {
    ...formValues,
    status,
    date
  });

  // 'PUT' request overwrites all the properties in the object like -> Since we only aimed to update 'title' and 'Description'
  // They are only  passed in formValues property and 'Id' is inbuilt property of object so it is automatically saved
  // whereas "userId" property need not to be updated and neither passed in formValues property, for 'put' request this assumes
  // that user do not need an 'userId' so It replaces it.

  // On other hand, "PATCH" request only updates some property as passed in formValues and leaves rest as it was.

  // Use both properties and do one console.log
  dispatch({ type: "EDIT_STREAM", payload: response.data });

  history.push("/");
};
export const viewInc = (id, view) => async dispatch => {
  const views = Number(view) + Number(1);
  const response = await streams.patch(`/streams/${id}`, {
    views
  });
  dispatch({ type: "VIEW_INC", payload: response.data });
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: "DELETE_STREAM", payload: id });

  history.push("/");
};
