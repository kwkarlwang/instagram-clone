import React, { Component } from "react";
import { Image, Row, Col } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";
import donut_logo from "../assets/donut.svg";

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.data, expanded: false };
  }
  createComment = (comment) => {
    const {
      id,
      CommentText,
      CommentUser,
      CommentTime,
      CommentLikes,
      CommentLiked,
    } = comment;
    const displayCommentTime = <span className="mr-2 text-muted">1h</span>;
    const likeOrLikes = CommentLikes > 1 ? "likes" : "like";
    const displayLikes = CommentLikes ? (
      <span className="mr-2 font-weight-bold text-muted">
        {CommentLikes} {likeOrLikes}
      </span>
    ) : (
      ""
    );
    const replyButton = (
      <span role="button" className="mr-2 font-weight-bold text-muted">
        Reply
      </span>
    );
    return (
      <Row key={id}>
        <Col xs={11} className="px-0 mx-0">
          <span className="font-weight-bold">{CommentUser} </span>
          <span>{CommentText}</span>
          <br />
          {displayCommentTime}
          {displayLikes}
          {replyButton}
        </Col>
        <Col xs={1} className="px-0">
          <Heart style={{ fontSize: "1rem" }} className="icons mr-0"></Heart>
        </Col>
      </Row>
    );
  };
  render() {
    const { InnerComments, expanded, CommentAvatar } = this.state;
    const replyOrReplies = InnerComments.length > 1 ? "replies" : "reply";
    const viewReplyString = expanded
      ? `Hide ${replyOrReplies}`
      : `View ${InnerComments.length} ${replyOrReplies}`;
    const viewReplies = InnerComments.length ? (
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
    const InnerCommentsList = expanded
      ? InnerComments.map((innerComment) => {
          return (
            <Row key={innerComment.id} className="my-2">
              <Col xs={2} className="pr-0">
                <Image
                  src={innerComment.CommentAvatar}
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
            src={CommentAvatar}
            roundedCircle
            style={{ width: "2rem" }}
          ></Image>
        </Col>
        <Col>
          {this.createComment(this.state)}
          {/* insert inner comments here */}
          <Row className="my-2">{viewReplies}</Row>
          {InnerCommentsList}
        </Col>
      </Row>
    );
  }
}

export default Comment;
