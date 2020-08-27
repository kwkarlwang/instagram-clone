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
  Heart,
  ThreeDots,
  ChatRight,
  BoxArrowUp,
  Bookmark,
} from "react-bootstrap-icons";
import donut_logo from "../assets/donut.svg";
import "./Post.css";
import MockData from "../schema/Post.json";
import { connect } from "react-redux";
import { getComments, addComment } from "../actions/commentActions";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...MockData,
      commentText: "",
    };
  }
  componentDidMount() {
    this.props.getComments();
  }
  onSubmit = () => {
    const newComment = {
      id: uuid(),
      commentUser: "me",
      commentAvatar: "https://picsum.photos/100/100",
      commentText: this.state.commentText,
      commentLikes: 0,
      commentLiked: false,
      commentTime: new Date(),
      innerComments: [],
    };
    this.props.addComment(newComment);
    this.setState({
      commentText: "",
    });
  };
  render() {
    const { comments } = this.props;
    const { commentText } = this.state;
    let outerComments = [];
    if (comments.length) {
      const reducer = (acc, comment) => acc + 1 + comment.innerComments.length;
      let numberOfComments = comments.reduce(reducer, 0);
      console.log(numberOfComments);
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
        <a href="/1" key={0} onClick={() => {}}>
          View all&nbsp;
          {numberOfComments === 1
            ? "1 comment"
            : `${numberOfComments} comments`}
        </a>
      );
      outerComments = [viewAllComments, ...commentsList];
    }
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
              src={donut_logo}
              roundedCircle
              style={{ width: "2rem", marginRight: "1rem" }}
            ></Image>
            {this.state.PostUser}
            <ThreeDots className="icons float-right mt-1 mr-0"></ThreeDots>
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src={this.state.PostImage} />
        <Card.Body id="text-container">
          <div className="align-middle">
            <Heart className="icons"></Heart>
            <ChatRight className="icons"></ChatRight>
            <BoxArrowUp
              style={{ marginBottom: "0.3rem" }}
              className="icons"
            ></BoxArrowUp>
            <Bookmark className="icons float-right mr-0"></Bookmark>
          </div>
          {/* replace this later */}
          <Card.Text className="font-weight-bold">3 likes</Card.Text>
          <Card.Text>
            <span className="font-weight-bold">{this.state.PostUser}</span>
            &nbsp;
            <span>{this.state.PostDesc}</span>
          </Card.Text>
          {outerComments}
          <Card.Text style={{ color: "grey" }}>{this.state.PostTime}</Card.Text>
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
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.comments,
});

export default connect(mapStateToProps, { getComments, addComment })(Post);
