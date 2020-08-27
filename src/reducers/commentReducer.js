import { GET_COMMENTS, ADD_COMMENT, ADD_INNERCOMMENT } from "../actions/types";

// const initialState = {
//   id: 1,
//   PostUser: "user_agent",
//   PostAvatar: "https://picsum.photos/100/100",
//   PostImage: "https://picsum.photos/400/400",
//   PostDesc: "blah blah blah",
//   PostLikes: 3,
//   PostLiked: false,
//   PostTime: "Now",
//   comments: [],
// };
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      return [...state, action.payload];
    case ADD_INNERCOMMENT:
      return state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          comment.InnerComments.push(action.payload.innerComment);
        }
        return comment;
      });
    default:
      return state;
  }
};
