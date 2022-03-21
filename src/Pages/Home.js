import React from "react";
import { Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user, logOut } = useAuth();
  return (
    <div>
      <Container>
        <div className="my-4">
          <h1>Welcome!! to home page</h1>
          <h2>{user?.displayName ? user.displayName : user.email}</h2>
          {user?.email && (
            <button className="py-2 fw-bold btn custom-button" onClick={logOut}>
              Log Out
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
