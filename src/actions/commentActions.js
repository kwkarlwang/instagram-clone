import { GET_COMMENTS, ADD_COMMENT, ADD_INNERCOMMENT } from "./types";

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
  const comments = localStorage.getItem("comments");
  const outerComment = comments.filter((comment) => {
    return comment.id === commentId;
  });
  outerComment.InnerComments.push(innerComment);
  localStorage.setItem("comments", comments);
  dispatch({
    type: ADD_INNERCOMMENT,
    payload: {
      commentId,
      innerComment,
    },
  });
};
