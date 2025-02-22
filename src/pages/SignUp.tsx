import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api/axios";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setError(null); // Reset errors
    try {
      const response = await api.post("/users/signup", data);
      console.log("Registration successful:", response.data);
      alert("Registration successful, going to sign in");
      navigate("/signin");
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Show specific message
      } else {
        setError("Error during registration");
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/signin">Sign in here</Link>
      </p>
    </Container>
  );
};

export default SignUp;
