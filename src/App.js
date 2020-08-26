import React from "react";
import Post from "./components/Post";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandscapePost from "./components/LandscapePost";
function App() {
  return (
    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Router>
        <Route exact path="/" component={ProtraitWrapper}></Route>
        <Route exact path="/:id" component={LandscapeWrapper}></Route>
      </Router>
    </Container>
  );
}

export default App;

function ProtraitWrapper() {
  return (
    <Row>
      <Col xs={2}></Col>
      <Col xs={8}>
        <Post></Post>
      </Col>
      <Col xs={2}></Col>
    </Row>
  );
}
function LandscapeWrapper() {
  return <LandscapePost></LandscapePost>;
}
