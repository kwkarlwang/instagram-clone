import React from "react";
import Post from "./components/Post";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandscapePost from "./components/LandscapePost";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Router>
          <Route exact path="/" component={ProtraitWrapper}></Route>
          <Route exact path="/:id" component={LandscapePost}></Route>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;

function ProtraitWrapper() {
  return (
    <Row>
      <Col sm={0} md={2} lg={3}></Col>
      <Col sm={12} md={8} lg={6}>
        <Post></Post>
      </Col>
      <Col sm={0} md={2} lg={3}></Col>
    </Row>
  );
}
