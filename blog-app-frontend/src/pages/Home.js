import React, { useEffect } from "react";
import { Button, Container } from "reactstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
const Home = () => {
  return (
    <Base>
      <div>
        <Container className="mt-3">
          <NewFeed />
        </Container>
      </div>
    </Base>
  );
};

export default Home;
