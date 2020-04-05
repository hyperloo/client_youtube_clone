import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    // { ...state, [action.payload.id]: action.payload } is same as
    //const newState = {...state};
    //newState[action.payload.id] = action.payload
    //return newState

    //And this will create an object in collection of object if it does not exist & if one exists
    //then updates it with same id

    case "FETCH_STREAMS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "FETCH_STREAM":
      return { ...state, [action.payload.id]: action.payload }; //payload is the response object from action/index.js
    case "CREATE_STREAM":
      return { ...state, [action.payload.id]: action.payload }; //payload is the response object from action/index.js
    case "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload }; //payload is the response object from action/index.js
    case "DELETE_STREAM":
      return _.omit(state, action.payload); //here payload is ID of deleted element as passed from action/index.js
    //and _.omit return object collection except the id with action.payload
    case "VIEW_INC":
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
