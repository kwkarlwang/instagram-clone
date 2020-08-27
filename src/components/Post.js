import React, { Component } from "react";
import {
  Card,
  Image,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import {
  HeartFill,
  Heart,
  ThreeDots,
  ChatRight,
  BoxArrowUp,
  Bookmark,
} from "react-bootstrap-icons";
import "./Post.css";
import User from "../default/User.json";
import { connect } from "react-redux";
import { getComments, addComment } from "../actions/commentActions";
import { getPost, likePost } from "../actions/postActions";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export class Post extends Component {
  state = {
    commentText: "",
  };
  componentDidMount() {
    this.props.getPost();
    this.props.getComments();
  }
  onSubmit = () => {
    const newComment = {
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
    // clear the text
    this.setState({
      commentText: "",
    });
  };
  onLike = () => {
    this.props.likePost();
  };
  render() {
    const { comments, post } = this.props;
    const { commentText } = this.state;
    let outerComments = [];
    if (comments.length) {
      const reducer = (acc, comment) => acc + 1 + comment.innerComments.length;
      let numberOfComments = comments.reduce(reducer, 0);
      const commentsList = comments.slice(-2).map((outerComment) => {
        return (
          <Card.Text key={outerComment.id}>
            <span className="font-weight-bold">{outerComment.commentUser}</span>
            &nbsp;
            <span>{outerComment.commentText}</span>
          </Card.Text>
        );
      });
      const viewAllComments = (
        <a
          href={`/${post.id}`}
          className="text-muted text-decoration-none"
          key={0}
        >
          View all&nbsp;
          {numberOfComments === 1
            ? "1 comment"
            : `${numberOfComments} comments`}
        </a>
      );
      outerComments = [viewAllComments, ...commentsList];
    }

    const likeOrLikes = post.postLikes > 1 ? "likes" : "like";
    const likeString = post.postLikes ? `${post.postLikes} ${likeOrLikes}` : "";
    // comment component
    const addAComment = (
      <Row>
        <Col xs={10}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) =>
              this.setState({
                commentText: e.target.value,
              })
            }
          />
        </Col>
        <Col xs={2}>
          <span
            role="button"
            style={{ opacity: commentText ? 1 : 0.5 }}
            id="post-button"
            className="float-right text-primary font-weight-bold"
            onClick={this.onSubmit}
            variant="link"
          >
            Post
          </span>
        </Col>
      </Row>
    );
    return (
      <Card>
        <Card.Body id="username-container">
          <Card.Text className="font-weight-bold align-middle">
            <Image
              src={post.postAvatar}
              roundedCircle
              style={{ width: "2rem", marginRight: "1rem" }}
            ></Image>
            {post.postUser}
            <ThreeDots className="icons float-right mt-1 mr-0"></ThreeDots>
          </Card.Text>
        </Card.Body>
        <Card.Img
          variant="top"
          src={post.postImage}
          onDoubleClick={() => (!post.postLiked ? this.onLike() : null)}
        />
        <Card.Body id="text-container">
          <div className="align-middle">
            {post.postLiked ? (
              <HeartFill
                onClick={this.onLike}
                className="icons text-danger"
              ></HeartFill>
            ) : (
              <Heart onClick={this.onLike} className="icons"></Heart>
            )}
            <ChatRight className="icons"></ChatRight>
            <BoxArrowUp
              style={{ marginBottom: "0.3rem" }}
              className="icons"
            ></BoxArrowUp>
            <Bookmark className="icons float-right mr-0"></Bookmark>
          </div>
          {/* replace this later */}
          <Card.Text className="font-weight-bold">{likeString}</Card.Text>
          <Card.Text>
            <span className="font-weight-bold">{post.postUser}</span>
            &nbsp;
            <span>{post.postDesc}</span>
          </Card.Text>
          {outerComments}
          <Card.Text style={{ color: "grey" }}>{post.postTime}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="add-a-comment">{addAComment}</ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

Post.propTypes = {
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
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
  getPost,
  likePost,
})(Post);
