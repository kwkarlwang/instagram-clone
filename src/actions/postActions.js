import { LIKE_POST, GET_POST } from "./types";
import defaultPost from "../default/Post.json";

/**
 * fetch the post information from local storage
 */
export const getPost = () => (dispatch) => {
  if (!("post" in localStorage)) {
    defaultPost.postTime = new Date();
    localStorage.setItem("post", JSON.stringify(defaultPost));
  }
  const post = JSON.parse(localStorage.getItem("post"));
  dispatch({
    type: GET_POST,
    payload: post,
  });
};

/**
 * handle liking the post
 */
export const likePost = () => (dispatch) => {
  const post = JSON.parse(localStorage.getItem("post"));
  post.postLiked = !post.postLiked;
  post.postLikes += post.postLiked ? 1 : -1;
  localStorage.setItem("post", JSON.stringify(post));
  dispatch({
    type: LIKE_POST,
    payload: post,
  });
};
