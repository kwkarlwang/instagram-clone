import {
  GET_COMMENTS,
  ADD_COMMENT,
  ADD_INNERCOMMENT,
  LIKE_COMMENT,
  LIKE_INNERCOMMENT,
} from "./types";

export const getComments = () => (dispatch) => {
  let comments = [];
  if ("comments" in localStorage) {
    comments = JSON.parse(localStorage.getItem("comments"));
  }
  dispatch({
    type: GET_COMMENTS,
    payload: comments,
  });
};

export const addComment = (comment) => (dispatch) => {
  let comments = [];
  if ("comments" in localStorage) {
    comments = JSON.parse(localStorage.getItem("comments"));
  }
  localStorage.setItem("comments", JSON.stringify([...comments, comment]));
  dispatch({
    type: ADD_COMMENT,
    payload: comment,
  });
};

export const addInnerComment = (commentId, innerComment) => (dispatch) => {
  const comments = JSON.parse(localStorage.getItem("comments"));
  const outerComment = comments.find((comment) => comment.id === commentId);
  outerComment.innerComments.push(innerComment);
  localStorage.setItem("comments", JSON.stringify(comments));
  dispatch({
    type: ADD_INNERCOMMENT,
    payload: {
      commentId,
      innerComment,
    },
  });
};

export const likeComment = (commentId) => (dispatch) => {
  const comments = JSON.parse(localStorage.getItem("comments"));
  const comment = comments.find((comment) => comment.id === commentId);
  comment.commentLiked = !comment.commentLiked;
  comment.commentLikes += comment.commentLiked ? 1 : -1;
  localStorage.setItem("comments", JSON.stringify(comments));
  dispatch({
    type: LIKE_COMMENT,
    payload: {
      commentId,
      comment,
    },
  });
};

export const likeInnerComment = (commentId, innerCommentId) => (dispatch) => {
  const comments = JSON.parse(localStorage.getItem("comments"));
  console.log(comments);
  const comment = comments.find((comment) => comment.id === commentId);
  const innerComment = comment.innerComments.find(
    (innerComment) => innerComment.id === innerCommentId
  );
  innerComment.commentLiked = !innerComment.commentLiked;
  innerComment.commentLikes += innerComment.commentLiked ? 1 : -1;
  localStorage.setItem("comments", JSON.stringify(comments));
  dispatch({
    type: LIKE_INNERCOMMENT,
    payload: {
      commentId,
      innerCommentId,
      innerComment,
    },
  });
};
