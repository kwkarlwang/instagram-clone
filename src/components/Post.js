import React, { Component } from "react";
import { Card, Button, Image } from "react-bootstrap";
import donut_logo from "../assets/donut.svg";
export class Post extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Text style={{ fontWeight: "700" }}>
            <Image
              src={donut_logo}
              roundedCircle
              fluid
              style={{ width: "2rem", marginRight: "1rem" }}
            ></Image>
            user_agent
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src="https://picsum.photos/400/300" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
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
