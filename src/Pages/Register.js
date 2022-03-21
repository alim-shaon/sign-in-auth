import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./login.css";

import t4t from "../images/blue-logo1.png";
import personImage from "../images/person.png";
import leftImage from "../images/left-side.png";

import { Col, Container, Row } from "react-bootstrap";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setIsLoading, signUpUsingEmail } = useAuth();
  const [error, setError] = useState(" ");
  // redirect to home page
  const navigate = useNavigate();
  const redirectUri = "/";

  // registation using email and password
  const onSubmit = (data) => {
    // setting email and password
    if (data.password.length < 6) {
      setError("Password must be at least 6 character long");
      return;
    }
    signUpUsingEmail(data.email, data.password)
      .then((result) => {
        navigate(redirectUri);
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="custom-form-background py-5 overflow-hidden">
      <Container className="position-relative">
        <Row xs={1} md={2} lg={2} className="g-4">
          <Col className="left-image-container">
            <img className="h-75" src={leftImage} alt="" />
          </Col>
          <Col className="login-card">
            <img className="t-logo" src={t4t} alt="" />
            <h3>Explore The Best Tours... Hurry up!!</h3>
            <div className="my-4">
              {/* main form staets here */}
              <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-control my-3 mx-auto w-50"
                  type="email"
                  placeholder="e-mail"
                  {...register("email", { required: true })}
                />
                <div className="text-start">
                  {errors.email && (
                    <span className="text-start error">
                      This field is required.
                    </span>
                  )}
                </div>

                <input
                  className="form-control my-3 mx-auto w-50"
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                />

                <div className="text-start">
                  {errors.password && (
                    <span className="text-start error">
                      This field is required.
                    </span>
                  )}
                </div>
                <div className="text-start text-danger">{error}</div>

                <input
                  className="py-2 fw-bold btn custom-button"
                  type="submit"
                  value="REGISTER"
                />
                <br />
              </form>
              <div className="py-5">
                <p>
                  Already have an account?{" "}
                  <Link to="/login">
                    <span>Sign In</span>
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <div className="person-image-container">
          <img src={personImage} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default Register;
