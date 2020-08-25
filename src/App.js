import React from "react";
import Post from "./components/Post";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
function App() {
  return (
    <Container>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          <Post></Post>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
