import { LIKE_POST, GET_POST } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIKE_POST:
      return action.payload;
    case GET_POST:
      return action.payload;
    default:
      return state;
  }
};
