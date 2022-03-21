import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import "./login.css";

import googleImg from "../images/icons8-google.svg";
import facebookImg from "../images/icons8-facebook.svg";
import t4t from "../images/blue-logo1.png";
import personImage from "../images/person.png";
import leftImage from "../images/left-side.png";

import { Col, Container, Row } from "react-bootstrap";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const {
    signInUsingGoogle,
    setIsLoading,
    signInUsingEmail,
    signInUsingFacebook,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectUri = location.state?.from || "/";
  // google sign in
  const handelGoogleSignin = () => {
    signInUsingGoogle()
      .then((result) => {
        navigate(redirectUri);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // google sign in
  const handelFacebookSignin = () => {
    signInUsingFacebook()
      .then((result) => {
        navigate(redirectUri);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // email and password sign in
  const onSubmit = (data) => {
    signInUsingEmail(data.email, data.password)
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
                  className="form-control my-3 w-50 mx-auto custom-border-radius"
                  type="email"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />
                <input
                  className="form-control mt-3  w-50 mx-auto custom-border-radius"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />

                {errors.email && (
                  <span className="error">This field is required</span>
                )}
                <div className="text-start text-danger">{error}</div>

                <div className="text-danger text-end mx-auto forget-pass-text">
                  <p>Forget Password?</p>
                </div>
                <input
                  className="py-2 fw-bold btn custom-button"
                  type="submit"
                  value="LOG IN"
                />
                <br />
              </form>
              <div className="my-5">
                <p className="or-style">or</p>
              </div>
              <div className="d-flex justify-content-center">
                <div className="mx-3">
                  <img
                    onClick={handelGoogleSignin}
                    className="other-sign-in"
                    src={googleImg}
                    alt=""
                  />
                </div>
                <div className="mx-3">
                  <img
                    onClick={handelFacebookSignin}
                    className="other-sign-in"
                    src={facebookImg}
                    alt=""
                  />
                </div>
              </div>
              <div className="py-5">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">
                    <span>Sign Up</span>
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

export default Login;
