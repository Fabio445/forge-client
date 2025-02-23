import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api/axios";

type SignInProps = {
  onLogin: () => void;
};

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [signInMethod, setSignInMethod] = useState<string>("username");

  const onSubmit = async (data: FormData) => {
    setError(null);
  
    const signInData: Partial<FormData> = {
      password: data.password,
    };
  
    if (signInMethod === "username") {
      signInData.username = data.username;
    } else if (signInMethod === "email") {
      signInData.email = data.email;
    }
  
    try {
      const response = await api.post("/users/login", signInData);
      const { token, userId } = response.data;
  
      // Save and immediately display the token in the console
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      console.log("Token received immediately after login:", token);
  
      // Update authentication
      onLogin();
      navigate("/");
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error during login");
      }
    }
  };
  

  return (
    <Container className="mt-5">
      <h2 className="text-center">Sign In</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group className="mb-3">
          <Form.Label>Sign in with</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSignInMethod(e.target.value)}
          >
            <option value="username">Username</option>
            <option value="email">Email</option>
          </Form.Control>
        </Form.Group>

        {signInMethod === "username" && (
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
        )}

        {signInMethod === "email" && (
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
        )}

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

        <Button variant="primary" type="submit" className="w-100">
          Sign In
        </Button>
      </Form>
      <p className="mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </Container>
  );
};

export default SignIn;
