import React, { Component } from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import {
  HeartFill,
  Heart,
  ThreeDots,
  ChatRight,
  BoxArrowUp,
  Bookmark,
} from "react-bootstrap-icons";
import Comment from "./Comment";
import User from "../default/User.json";
import {
  getComments,
  addComment,
  addInnerComment,
  likeComment,
  likeInnerComment,
} from "../actions/commentActions";
import { getPost, likePost } from "../actions/postActions";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { createTimeString, createCommentTimeString } from "../helpers/time";
import "./LandscapePost.css";
export class LandscapePost extends Component {
  constructor(props) {
    super(props);
    this.image = React.createRef();
    this.state = {
      isInnerComment: false,
      currentCommentId: "",
      commentText: "",
      cardHeight: 100,
    };
    this.inputRef = React.createRef();
  }
  componentDidMount() {
    // populate redux store
    this.props.getComments();
    this.props.getPost();
    // handle resize
    window.addEventListener("resize", () => {
      this.setState({
        cardHeight: this.image.current.height,
      });
    });
  }
  onSubmit = () => {
    let newComment = {};
    // if not inner comment, add to outer comments
    if (!this.state.isInnerComment) {
      newComment = {
        id: uuid(),
        commentUser: User.username,
        commentAvatar: User.avatar,
        commentText: this.state.commentText,
        commentLikes: 0,
        commentLiked: false,
        commentTime: new Date(),
        innerComments: [],
      };
      this.props.addComment(newComment);
    } else {
      newComment = {
        id: uuid(),
        commentUser: User.username,
        commentAvatar: User.avatar,
        commentText: this.state.commentText,
        commentLikes: 0,
        commentLiked: false,
        commentTime: new Date(),
      };
      this.props.addInnerComment(this.state.currentCommentId, newComment);
    }
    // clear the text
    this.setState({
      commentText: "",
      isInnerComment: false,
      currentCommentId: "",
    });
  };
  onReplyButton = (commentId, replyUser) => {
    // reply populates the @username
    this.setState({
      commentText: `@${replyUser} `,
      isInnerComment: true,
      currentCommentId: commentId,
    });
    this.inputRef.current.focus();
  };
  onLikeComment = (commentId, innerCommentId) => {
    // liked a inner comment
    if (commentId !== innerCommentId) {
      this.props.likeInnerComment(commentId, innerCommentId);
    } else {
      this.props.likeComment(commentId);
    }
  };
  onLike = () => {
    this.props.likePost();
  };
  render() {
    const {
      postDesc,
      postImage,
      postAvatar,
      postUser,
      postLikes,
      postLiked,
      postTime,
    } = this.props.post;
    const { comments } = this.props;
    const { commentText, cardHeight } = this.state;
    const usernameRow = (
      <div className="d-flex align-content-center">
        <div className="pr-3">
          <Image src={postAvatar} roundedCircle className="avatar"></Image>
        </div>
        <div className="my-auto">
          <span className="font-weight-bold align-text-bottom">
            {postUser} · Following
          </span>
        </div>
        <div className="ml-auto my-auto">
          <ThreeDots className="icons float-right mr-0"></ThreeDots>
        </div>
      </div>
    );

    const postTimeString = createCommentTimeString(postTime);
    const postComment = (
      <div className="d-flex align-content-center my-2">
        <div className="pr-3">
          <Image
            src={postAvatar}
            alt="landscape-avatar"
            roundedCircle
            className="avatar"
          ></Image>
        </div>
        <div className="my-auto">
          <span className="font-weight-bold">{postUser} </span>
          <span>{postDesc}</span>
          <br />
          <span className="mr-2 text-muted">{postTimeString}</span>
        </div>
      </div>
    );
    const commentsRow = (
      <div className="overflow-scroll">
        {postComment}
        {comments.map((outerComment) => {
          return (
            <Comment
              key={outerComment.id}
              data={outerComment}
              onLikeComment={this.onLikeComment}
              onReplyButton={this.onReplyButton}
            ></Comment>
          );
        })}
      </div>
    );
    const likeOrLikes = postLikes > 1 ? "likes" : "like";
    const displayLikes = postLikes ? `${postLikes} ${likeOrLikes}` : "";
    // post form
    const addAComment = (
      <div className="d-flex">
        <div className="w-100">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            ref={this.inputRef}
            onChange={(e) =>
              this.setState({
                commentText: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-auto">
          <span
            role="button"
            style={{ color: "blue", opacity: commentText ? 1 : 0.5 }}
            id="post-button"
            className="float-right text-primary font-weight-bold"
            onClick={this.onSubmit}
          >
            Post
          </span>
        </div>
      </div>
    );
    const timeString = createTimeString(postTime);

    return (
      <Row className="no-gutters">
        {/* handle resize */}
        <Col sm={12} md={7}>
          <Card.Img
            ref={this.image}
            src={postImage}
            alt="landscape-image"
            onDoubleClick={() => (!postLiked ? this.onLike() : null)}
            // image determines card height
            onLoad={(img) => {
              this.setState({ cardHeight: img.target.height });
            }}
          ></Card.Img>
        </Col>
        <Col sm={12} md={5}>
          <Card style={{ minHeight: cardHeight, maxHeight: cardHeight }}>
            {/* display username and avatar */}
            <Card.Header className="bg-transparent px-3">
              {usernameRow}
            </Card.Header>
            {/* display comments, handle overflow */}
            <Card.Body className="overflow-auto py-0 px-3">
              {commentsRow}
            </Card.Body>
            {/* display icons */}
            <Card.Footer className="text-muted bg-transparent">
              <div>
                {postLiked ? (
                  <HeartFill
                    role="button"
                    onClick={this.onLike}
                    className="icons text-danger"
                    data-testid="landscape-unlike-button"
                  ></HeartFill>
                ) : (
                  <Heart
                    role="button"
                    onClick={this.onLike}
                    className="icons"
                    data-testid="landscape-like-button"
                  ></Heart>
                )}
                <ChatRight
                  role="button"
                  className="icons"
                  onClick={() => this.inputRef.current.focus()}
                ></ChatRight>
                <BoxArrowUp
                  style={{ marginBottom: "0.3rem" }}
                  className="icons"
                ></BoxArrowUp>
                <Bookmark className="icons float-right mr-0"></Bookmark>
              </div>
              <div
                className="font-weight-bold text-body"
                data-testid="landscape-likes"
              >
                {displayLikes}
              </div>
              <div className="font-small text-muted">
                <small>{timeString}</small>
              </div>
            </Card.Footer>
            {/* display post input */}
            <Card.Footer className="text-muted bg-transparent">
              {addAComment}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}
LandscapePost.propTypes = {
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  addInnerComment: PropTypes.func.isRequired,
  likeInnerComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  comments: state.comments,
});

export default connect(mapStateToProps, {
  getComments,
  addComment,
  addInnerComment,
  likeInnerComment,
  getPost,
  likePost,
  likeComment,
})(LandscapePost);
