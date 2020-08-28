import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import localStorage from "./mocks/localStorageMock";
import defaultPost from "../default/Post.json";
import LandscapePost from "../components/LandscapePost";
import store from "../store";
import { Provider } from "react-redux";
const renderWrapper = (component) => {
  render(<Provider store={store}>{component}</Provider>);
};

const getPostLikes = () => {
  let res = screen.getByTestId("landscape-likes").textContent;
  res = res.split(" ")[0];
  return Number(res);
};

describe("test empty localStorage on Post.js", () => {
  beforeEach(() => {
    localStorage.clear();
    expect(localStorage.getItem("post")).toBe(undefined);
    renderWrapper(<LandscapePost />);
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
    const regex = new RegExp(post["postUser"], "i");
    const postUser = screen.queryAllByText(regex);
    expect(postUser.length).toBe(2);

    const postDesc = screen.queryByText(post["postDesc"]);
    expect(postDesc).toBeInTheDocument();
    expect(postDesc.textContent).toBe(post["postDesc"]);

    const postAvatar = screen.getByAltText("landscape-avatar");
    expect(postAvatar.getAttribute("src")).toBe(post["postAvatar"]);

    const postImage = screen.getByAltText("landscape-image");
    expect(postImage.getAttribute("src")).toBe(post["postImage"]);
  });
  test("like the post", () => {
    let postLikesBefore = getPostLikes();
    let likeButton = screen.getByTestId("landscape-like-button");
    const postImage = screen.getByAltText("landscape-image");
    expect(likeButton).toBeInTheDocument();

    // should increase by 1
    fireEvent.doubleClick(postImage);
    let unlikeButton = screen.getByTestId("landscape-unlike-button");
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
    likeButton = screen.getByTestId("landscape-like-button");
    fireEvent.click(likeButton);
    postLikesNow = getPostLikes();
    expect(postLikesNow).toBe(postLikesBefore + 1);
  });

  test("test comment and like comment", () => {
    // test comment
    const testComment = "testing comment";
    const commentInput = screen.queryByPlaceholderText("Add a comment...");
    expect(commentInput).toBeTruthy();
    fireEvent.change(commentInput, {
      target: { value: testComment },
    });
    const postButton = screen.queryByText("Post");
    fireEvent.click(postButton);
    expect(screen.queryByText(testComment)).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "comments",
      expect.anything()
    );
    let comments = JSON.parse(localStorage.getItem("comments"));
    let comment = comments.find(
      (comment) => comment.commentText === testComment
    );
    expect(comment.commentText).toBe(testComment);
    expect(comment.innerComments).toEqual([]);
    expect(screen.queryByText(testComment)).toBeInTheDocument();

    // test inner comment
    const testInnerComment = "testing inner comment";
    const replyButton = screen.queryAllByText("Reply").pop();
    fireEvent.click(replyButton);
    expect(commentInput.value).toBe(`@${comment.commentUser} `);

    fireEvent.change(commentInput, {
      target: { value: testInnerComment },
    });
    fireEvent.click(postButton);
    comments = JSON.parse(localStorage.getItem("comments"));
    comment = comments.find((comment) => comment.commentText === testComment);
    const innerComment = comment.innerComments.find(
      (innerComment) => innerComment.commentText === testInnerComment
    );
    expect(innerComment.commentText).toBe(testInnerComment);

    const viewAllReplyButton = screen.queryAllByText(/View/i).pop();
    fireEvent.click(viewAllReplyButton);
    expect(screen.queryByText(/hide/i)).toBeInTheDocument();
    expect(screen.queryByText(testInnerComment)).toBeInTheDocument();

    // test liking outercomment
    // new comments are in the end of the array
    let likeButtons = screen.getAllByTestId("comment-like-button");
    fireEvent.click(likeButtons[likeButtons.length - 2]);
    expect(screen.queryByText("1 like")).toBeInTheDocument();
    let unlikeButton = screen.queryAllByTestId("comment-unlike-button").pop();
    fireEvent.click(unlikeButton);
    expect(screen.queryByText("1 like")).not.toBeInTheDocument();

    // test liking innercomment
    let likeButton = screen.getAllByTestId("comment-like-button").pop();
    fireEvent.click(likeButton);
    expect(screen.queryByText("1 like")).toBeInTheDocument();
    unlikeButton = screen.queryAllByTestId("comment-unlike-button").pop();
    fireEvent.click(unlikeButton);
    expect(screen.queryByText("1 like")).not.toBeInTheDocument();
  });
});
