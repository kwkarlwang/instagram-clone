import React, { Component } from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { Heart, ThreeDots, ChatRight, BoxArrowUp } from "react-bootstrap-icons";
import donut_logo from "../assets/donut.svg";
import "./Post.css";
export class Post extends Component {
  render() {
    return (
      <Card>
        <Card.Body id="username-container">
          <Card.Text className="username">
            <Image
              src={donut_logo}
              roundedCircle
              fluid
              style={{ width: "2rem", marginRight: "1rem" }}
            ></Image>
            user_agent
            <div className="align-middle float-right">
              <ThreeDots className="icons"></ThreeDots>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src="https://picsum.photos/400/300" />
        <Card.Body id="text-container">
          <div className="align-middle">
            <Heart className="icons"></Heart>
            <ChatRight className="icons"></ChatRight>
            <BoxArrowUp style={{paddingDown: "1r"}} className="icons"></BoxArrowUp>
          </div>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Post;
