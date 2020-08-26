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
    const { PostImage, PostAvatar, PostUser, Comments } = this.state;
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
    return (
      <div>
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
              <Card.Header className="bg-transparent">
                {usernameRow}
              </Card.Header>
              <Card.Body className="overflow-auto py-0">
                {commentsRow}
              </Card.Body>
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
              </Card.Footer>
              <Card.Footer className="text-muted bg-transparent">
                2 days ago
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LandscapePost;
