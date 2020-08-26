import React, { Component } from "react";
import { Card, Button, Image, Row, Col, ListGroup } from "react-bootstrap";
import MockData from "../schema/Post.json";
import {
  Heart,
  ThreeDots,
  ChatRight,
  BoxArrowUp,
  Bookmark,
} from "react-bootstrap-icons";
import donut_logo from "../assets/donut.svg";
import Comment from "./Comment";

export class LandscapePost extends Component {
  constructor(props) {
    super(props);
    this.image = React.createRef();

    this.state = {
      ...MockData,
      commentText: "",
      cardHeight: 100,
      commentText: "",
    };
  }
  componentDidMount() {
    // handle resize
    window.addEventListener("resize", () => {
      this.setState({
        cardHeight: this.image.current.height,
      });
    });
  }
  render() {
    const {
      PostImage,
      PostAvatar,
      PostUser,
      Comments,
      PostLikes,
      commentText,
    } = this.state;
    const usernameRow = (
      <Row>
        <Col xs={2}>
          <Image
            src={donut_logo}
            roundedCircle
            style={{ width: "2rem", marginRight: "1rem" }}
          ></Image>
        </Col>
        <Col>
          <Row>
            <Col xs={10} className="px-0">
              <span className="font-weight-bold align-middle">
                {this.state.PostUser} · Following
              </span>
            </Col>
            <Col xs={2}>
              <ThreeDots className="icons float-right mt-1 mr-0"></ThreeDots>
            </Col>
          </Row>
        </Col>
      </Row>
    );
    const commentsRow = (
      <div className="overflow-scroll">
        {Comments.map((outerComment) => {
          return <Comment key={outerComment.id} data={outerComment}></Comment>;
        })}
      </div>
    );
    const likeOrLikes = PostLikes > 1 ? "likes" : "like";
    const displayLikes = PostLikes ? `${PostLikes} ${likeOrLikes}` : "";

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
            style={{ color: "blue", opacity: commentText ? 1 : 0.5 }}
            id="post-button"
            className="float-right text-primary font-weight-bold"
            variant="link"
          >
            Post
          </span>
        </Col>
      </Row>
    );

    return (
      <Row>
        <Col xs={7} className="px-0">
          <Card.Img
            ref={this.image}
            src={PostImage}
            onLoad={(img) => {
              this.setState({ cardHeight: img.target.height });
            }}
          ></Card.Img>
        </Col>
        <Col xs={5} className="pl-0">
          <Card style={{ maxHeight: this.state.cardHeight }}>
            <Card.Header className="bg-transparent">{usernameRow}</Card.Header>
            <Card.Body className="overflow-auto py-0">{commentsRow}</Card.Body>
            <Card.Footer className="text-muted bg-transparent">
              <div className="align-middle">
                <Heart className="icons"></Heart>
                <ChatRight className="icons"></ChatRight>
                <BoxArrowUp
                  style={{ marginBottom: "0.3rem" }}
                  className="icons"
                ></BoxArrowUp>
                <Bookmark className="icons float-right mr-0"></Bookmark>
              </div>
              <div className="font-weight-bold text-body">{displayLikes}</div>
              <div className="font-small text-muted">
                <small>2 HOURS AGO</small>
              </div>
            </Card.Footer>
            <Card.Footer className="text-muted bg-transparent">
              {addAComment}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default LandscapePost;
