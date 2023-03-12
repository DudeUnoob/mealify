import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap"
import { productionAPIURL } from "../../config/config.json"

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/dashboard");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "", username: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${productionAPIURL}/login`,
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password, username } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    // <div className="container">
    //   <h2>Login to your Account</h2>
    //   <form onSubmit={(e) => handleSubmit(e)}>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="text"
    //         name="email"
    //         placeholder="Email"
    //         onChange={(e) =>
    //           setValues({ ...values, [e.target.name]: e.target.value })
    //         }
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         name="password"
    //         onChange={(e) =>
    //           setValues({ ...values, [e.target.name]: e.target.value })
    //         }
    //       />
    //     </div>
    //     <button type="submit">Submit</button>
    //     <span>
    //       Don't have an account ?<Link to="/register"> Register </Link>
    //     </span>
    //   </form>
    //   <ToastContainer />
    // </div>

<div className="container">
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
      <span>
        Don't have an account? <Link to="/register">Register</Link>
      </span>
    </Form>
    <ToastContainer />

    </div>
  );
}

export default Login;
