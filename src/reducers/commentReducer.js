import {
  GET_COMMENTS,
  ADD_COMMENT,
  ADD_INNERCOMMENT,
  LIKE_COMMENT,
  LIKE_INNERCOMMENT,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      // append the new comment at the end
      return [...state, action.payload];
    case ADD_INNERCOMMENT:
      // add the innerComments at the end of the outer comment
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          comment.innerComments.push(action.payload.innerComment);
        }
        return comment;
      });
    case LIKE_COMMENT:
      return state.map((comment) => {
        //   return the payload comment
        if (comment.id === action.payload.commentId) {
          return action.payload.comment;
        }
        return comment;
      });
    case LIKE_INNERCOMMENT:
      return state.map((comment) => {
        //   find the outer comment
        if (comment.id === action.payload.commentId) {
          comment.innerComments = comment.innerComments.map((innerComment) => {
            //   find the inner comment
            if (innerComment.id === action.payload.innerCommentId) {
              return action.payload.innerComment;
            }
            return innerComment;
          });
        }
        return comment;
      });
    default:
      return state;
  }
};
