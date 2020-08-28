import { LIKE_POST, GET_POST } from "./types";
import defaultPost from "../default/Post.json";

/**
 * reset the post in case error occured
 */
const resetPost = () => {
  defaultPost.postTime = new Date();
  localStorage.setItem("post", JSON.stringify(defaultPost));
};
/**
 * fetch the post information from local storage
 */
export const getPost = () => (dispatch) => {
  try {
    if (!("post" in localStorage)) {
      resetPost();
    }
    const post = JSON.parse(localStorage.getItem("post"));
    dispatch({
      type: GET_POST,
      payload: post,
    });
  } catch (e) {
    console.error(e);
    resetPost();
  }
};

/**
 * handle liking the post
 */
export const likePost = () => (dispatch) => {
  try {
    const post = JSON.parse(localStorage.getItem("post"));
    post.postLiked = !post.postLiked;
    post.postLikes += post.postLiked ? 1 : -1;
    localStorage.setItem("post", JSON.stringify(post));
    dispatch({
      type: LIKE_POST,
      payload: post,
    });
  } catch (e) {
    console.error(e);
    resetPost();
  }
};
