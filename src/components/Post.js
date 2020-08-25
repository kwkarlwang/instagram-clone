import React, { Component } from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
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
    this.state = {};
  }
  componentDidMount() {
    this.setState({
      ...MockData,
    });
  }
  render() {
    console.log(this.state);
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
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    );
  }
}

export default Post;
