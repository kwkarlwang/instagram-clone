import React from "react";
import Post from "./components/Post";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandscapePost from "./components/LandscapePost";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="d-flex min-vh-100 align-items-center p-5">
          <Container>
            <Switch>
              <Route exact path="/" component={ProtraitWrapper}></Route>
              <Route exact path="/:id" component={LandscapePost}></Route>
            </Switch>
          </Container>
        </div>
      </Provider>
    </Router>
  );
}

/**
 * give a responsive deisgn wrapper to post
 */
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

export default App;
