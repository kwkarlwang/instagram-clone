import React, { Component } from "react";
import { Image, Row, Col } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  createComment = (comment) => {
    const {
      id,
      commentText,
      commentUser,
      commentTime,
      commentLikes,
      commentLiked,
    } = comment;
    const displayCommentTime = <span className="mr-2 text-muted">1h</span>;
    const likeOrLikes = commentLikes > 1 ? "likes" : "like";
    const displayLikes = commentLikes ? (
      <span className="mr-2 font-weight-bold text-muted">
        {commentLikes} {likeOrLikes}
      </span>
    ) : (
      ""
    );
    const replyButton = (
      <span
        role="button"
        className="mr-2 font-weight-bold text-muted"
        onClick={() =>
          this.props.onReplyButton(this.props.data.id, commentUser)
        }
      >
        Reply
      </span>
    );
    return (
      <Row key={id}>
        <Col xs={11} className="px-0 mx-0">
          <span className="font-weight-bold">{commentUser} </span>
          <span>{commentText}</span>
          <br />
          {displayCommentTime}
          {displayLikes}
          {replyButton}
        </Col>
        <Col xs={1} className="px-0">
          {commentLiked ? (
            <HeartFill
              style={{ fontSize: "1rem" }}
              onClick={() => this.props.onLikeComment(this.props.data.id, id)}
              className="icons text-danger mr-0"
            ></HeartFill>
          ) : (
            <Heart
              style={{ fontSize: "1rem" }}
              className="icons mr-0"
              onClick={() => this.props.onLikeComment(this.props.data.id, id)}
            ></Heart>
          )}
        </Col>
      </Row>
    );
  };
  render() {
    const { innerComments, commentAvatar } = this.props.data;
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
    const innerCommentsList = expanded
      ? innerComments.map((innerComment) => {
          return (
            <Row key={innerComment.id} className="my-2">
              <Col xs={2} className="pr-0">
                <Image
                  src={innerComment.commentAvatar}
                  roundedCircle
                  style={{ width: "2rem" }}
                ></Image>
              </Col>
              <Col>{this.createComment(innerComment)}</Col>
            </Row>
          );
        })
      : "";

    return (
      <Row className="my-2">
        <Col xs={2} className="pr-0">
          <Image
            src={commentAvatar}
            roundedCircle
            style={{ width: "2rem" }}
          ></Image>
        </Col>
        <Col>
          {this.createComment(this.props.data)}
          {/* insert inner comments here */}
          <Row className="my-2">{viewReplies}</Row>
          {innerCommentsList}
        </Col>
      </Row>
    );
  }
}

export default Comment;
