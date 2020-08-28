import {
  GET_COMMENTS,
  ADD_COMMENT,
  ADD_INNERCOMMENT,
  LIKE_COMMENT,
  LIKE_INNERCOMMENT,
} from "./types";
import defaultComments from "../default/Comments.json";

/**
 * fetch the comments from localStorage
 */
export const getComments = () => (dispatch) => {
  if (!("comments" in localStorage)) {
    defaultComments.forEach((comment) => {
      comment.commentTime = new Date();
      comment.innerComments.forEach((innerComment) => {
        innerComment.commentTime = new Date();
      });
    });
    localStorage.setItem("comments", JSON.stringify(defaultComments));
  }
  const comments = JSON.parse(localStorage.getItem("comments"));
  dispatch({
    type: GET_COMMENTS,
    payload: comments,
  });
};

/**
 * add the new comment to localStorage
 * @param {Object} comment the new comment to add
 */
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

/**
 * add a inner comment to the given commentId
 * @param {String} commentId the outer comment id to add to
 * @param {Object} innerComment the new inner comment
 */
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

/**
 * Like the comment with associated comment id
 * @param {String} commentId the comment id to like
 */
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

/**
 * Like a inner comment based with the given outer comment and inner comment id
 * @param {String} commentId the outer comment id of the inner comment
 * @param {String} innerCommentId the inner comment id to like
 */
export const likeInnerComment = (commentId, innerCommentId) => (dispatch) => {
  const comments = JSON.parse(localStorage.getItem("comments"));
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
