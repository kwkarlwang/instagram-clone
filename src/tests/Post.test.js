import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import localStorage from "./mocks/localStorageMock";
import defaultPost from "../default/Post.json";
import store from "../store";
import { Provider } from "react-redux";
import Post from "../components/Post";
const getPostLikes = () => {
  let res = screen.getByTestId("post-likes").textContent;
  res = res.split(" ")[0];
  return Number(res);
};
const renderWrapper = (component) => {
  render(<Provider store={store}>{component}</Provider>);
};
describe("test Post.js", () => {
  beforeEach(() => {
    localStorage.clear();
    expect(localStorage.getItem("post")).toBe(undefined);
    renderWrapper(<Post />);
  });
  test("render correctly", () => {
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "post",
      expect.anything()
    );
    const post = JSON.parse(localStorage.getItem("post"));
    for (let key in post) {
      if (key === "postTime") continue;
      expect(post[key]).toEqual(defaultPost[key]);
    }
    const postUser = screen.getByTestId("post-username");
    expect(postUser).toBeInTheDocument();
    expect(postUser.textContent).toBe(post["postUser"]);

    const postDesc = screen.getByTestId("post-description");
    expect(postDesc).toBeInTheDocument();
    expect(postDesc.textContent).toBe(post["postDesc"]);

    const postAvatar = screen.getByAltText("post-avatar");
    expect(postAvatar.getAttribute("src")).toBe(post["postAvatar"]);

    const postImage = screen.getByAltText("post-image");
    expect(postImage.getAttribute("src")).toBe(post["postImage"]);

    const postLikes = getPostLikes();
    expect(postLikes).toBe(post["postLikes"]);
    // expect(postLikes)
  });

  test("like the post", () => {
    let postLikesBefore = getPostLikes();
    let likeButton = screen.getByTestId("post-like-button");
    const postImage = screen.getByAltText("post-image");
    expect(likeButton).toBeInTheDocument();

    // should increase by 1
    fireEvent.doubleClick(postImage);
    let unlikeButton = screen.getByTestId("post-unlike-button");
    let postLikesNow = getPostLikes();
    expect(postLikesNow).toBe(postLikesBefore + 1);
    expect(likeButton).not.toBeInTheDocument();
    expect(unlikeButton).toBeInTheDocument();

    // should not increease nor decrease
    fireEvent.doubleClick(postImage);
    postLikesNow = getPostLikes();
    expect(postLikesNow).toBe(postLikesBefore + 1);

    // should decrease by 1
    fireEvent.click(unlikeButton);
    postLikesNow = getPostLikes();
    expect(postLikesNow).toBe(postLikesBefore);
    expect(unlikeButton).not.toBeInTheDocument();

    // should increase by 1
    likeButton = screen.getByTestId("post-like-button");
    fireEvent.click(likeButton);
    postLikesNow = getPostLikes();
    expect(postLikesNow).toBe(postLikesBefore + 1);
  });

  test("add a comment", () => {
    const testComment = "testing comment";
    const commentInput = screen.queryByPlaceholderText("Add a comment...");
    expect(commentInput).toBeTruthy();
    fireEvent.change(commentInput, {
      target: { value: testComment },
    });
    const postButton = screen.queryByTestId("post-button");
    fireEvent.click(postButton);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "comments",
      expect.anything()
    );
    const viewAllComments = screen.queryByText(/View/i);
    expect(viewAllComments).toBeInTheDocument();
    const comments = JSON.parse(localStorage.getItem("comments"));
    const comment = comments.find(
      (comment) => comment.commentText === testComment
    );
    expect(comment.commentText).toBe(testComment);
    expect(screen.queryByText(testComment)).toBeInTheDocument();
  });
  // test("test routing, click comments icon", () => {
  //   const { history } = renderWithRouter(<App />);
  //   // history.push = jest.fn();
  //   expect(history.location.pathname).toBe("/");
  //   const chatButton = screen.getByTestId("post-chat-button");
  //   fireEvent.click(chatButton);
  //   const post = JSON.parse(localStorage.getItem("post"));
  //   console.log(history.location.pathname);
  //   // expect(history.push).toHaveBeenCalled();
  //   // expect(history.location.pathname).toBe(`/${post.id}`);
  // });
  // test("test routing, click view all comments", () => {
  //   const history = renderWithRouter(<App />);
  //   expect(history.location.pathname).toBe("/");
  //   fireEvent.click(screen.queryByTestId("post-chat-button"));
  //   const post = localStorage.getItem("post");
  //   expect(history.location.pathname).toBe(`/${post.id}`);
  // });
});

describe("test empty localStorage on LandscapePost.js", () => {});
