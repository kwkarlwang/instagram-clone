import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { createCommentTimeString } from "../helpers/time";
import "./Comment.css";

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  /**
   * create the heart icon for each comment
   * @param {Object} comment the data of a comment
   */
  createHeart = (comment) => {
    const { id, commentLiked } = comment;
    return (
      <div className="mt-2">
        {commentLiked ? (
          <HeartFill
            style={{ fontSize: "1rem" }}
            onClick={() => this.props.onLikeComment(this.props.data.id, id)}
            className="text-danger float-right"
            data-testid="comment-unlike-button"
          ></HeartFill>
        ) : (
          <Heart
            style={{ fontSize: "1rem" }}
            className="float-right"
            onClick={() => this.props.onLikeComment(this.props.data.id, id)}
            data-testid="comment-like-button"
          ></Heart>
        )}
      </div>
    );
  };

  /**
   * create the html element for a comment
   * @param {object} comment the data of a comment
   */
  createComment = (comment) => {
    const { commentText, commentUser, commentTime, commentLikes } = comment;
    const commentTimeString = createCommentTimeString(commentTime);
    const displayCommentTime = (
      <div className="mr-3">
        <span className="text-muted">{commentTimeString}</span>
      </div>
    );
    const likeOrLikes = commentLikes > 1 ? "likes" : "like";
    const displayLikes = commentLikes ? (
      <div className="mr-3">
        <span className="font-weight-bold text-muted">
          {commentLikes} {likeOrLikes}
        </span>
      </div>
    ) : (
      ""
    );
    const replyButton = (
      <span
        role="button"
        className="font-weight-bold text-muted"
        onClick={() =>
          this.props.onReplyButton(this.props.data.id, commentUser)
        }
      >
        Reply
      </span>
    );
    return (
      <div className="d-flex w-100">
        <div className="d-flex flex-column w-100">
          {/* username and comments */}
          <div>
            <span className="font-weight-bold">{commentUser} </span>
            <span>{commentText}</span>
          </div>
          {/* time, number of likes, and reply */}
          <div className="d-flex">
            {displayCommentTime}
            {displayLikes}
            {replyButton}
          </div>
        </div>
        {/* the like button */}
        <div className="ml-auto">{this.createHeart(comment)}</div>
      </div>
    );
  };
  render() {
    const { commentAvatar, innerComments } = this.props.data;
    const { expanded } = this.state;
    const replyOrReplies = innerComments.length > 1 ? "replies" : "reply";
    const viewReplyString = expanded
      ? `Hide ${replyOrReplies}`
      : `View ${innerComments.length} ${replyOrReplies}`;
    const viewReplies = innerComments.length ? (
      <span
        role="button"
        className="text-muted font-weight-bold font-smaller px-1"
        onClick={() => this.setState({ expanded: !this.state.expanded })}
      >
        &#8212; {viewReplyString}
      </span>
    ) : (
      ""
    );
    // inner comments list of a comment
    // visiable only if expanded
    const innerCommentsList = expanded
      ? innerComments.map((innerComment) => {
          return (
            <div
              key={innerComment.id}
              className="d-flex align-content-center my-2"
            >
              <div className="pr-3">
                <Image
                  src={innerComment.commentAvatar}
                  roundedCircle
                  className="avatar"
                ></Image>
              </div>
              <div className="d-flex w-100">
                {this.createComment(innerComment)}
              </div>
            </div>
          );
        })
      : "";
    return (
      <div className="d-flex align-content-center my-2">
        {/* comment avatar */}
        <div className="pr-3">
          <Image src={commentAvatar} roundedCircle className="avatar"></Image>
        </div>
        <div className="w-100">
          {this.createComment(this.props.data)}
          {viewReplies}
          {innerCommentsList}
        </div>
      </div>
    );
  }
}

export default Comment;
