import React, { Component } from "react";
import {
  Card,
  Button,
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
export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...MockData,
      commentText: "",
    };
  }
  componentDidMount() {
    // this.setState({ ...MockData });
  }
  render() {
    const { Comments, commentText } = this.state;
    let outerComments = [];
    if (Comments.length) {
      let numberOfComments = 0;
      const commentsList = this.state.Comments.map((outerComment) => {
        numberOfComments++;
        numberOfComments += outerComment.InnerComments.length;
        return (
          <Card.Text key={outerComment.id}>
            <span className="font-weight-bold">{outerComment.CommentUser}</span>
            &nbsp;
            <span>{outerComment.CommentText}</span>
          </Card.Text>
        );
      });
      const viewAllComments = (
        <a
          href="/"
          key={0}
          onClick={() => {
            console.log("hi");
          }}
        >
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
          <Button
            style={{ opacity: commentText ? 1 : 0.5 }}
            id="post-button"
            className="float-right"
            variant="link"
          >
            Post
          </Button>
        </Col>
      </Row>
    );
    return (
      <Card>
        <Card.Body id="username-container">
          <Card.Text className="font-weight-bold">
            <Image
              src={donut_logo}
              roundedCircle
              fluid
              style={{ width: "2rem", marginRight: "1rem" }}
            ></Image>
            {this.state.PostUser}
            <span className="align-middle float-right">
              <ThreeDots className="icons"></ThreeDots>
            </span>
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src="https://picsum.photos/400/300" />
        <Card.Body id="text-container">
          <div className="align-middle">
            <Heart className="icons"></Heart>
            <ChatRight className="icons"></ChatRight>
            <BoxArrowUp
              style={{ marginBottom: "0.3rem" }}
              className="icons"
            ></BoxArrowUp>
            <Bookmark
              style={{ marginRight: 0 }}
              className="icons float-right"
            ></Bookmark>
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

export default Post;
