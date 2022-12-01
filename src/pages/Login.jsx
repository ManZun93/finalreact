import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = data => {
    axios.post("https://e-commerce-api.academlo.tech/api/v1/users/login", data)
      .then(res => {
        navigate('/')
        console.log(res)
        localStorage.setItem("token", res.data.data.token)


      })
      .catch(error => {
        if (error.response?.status === 404) {
          alert("Credenciales incorrectas")
        } else {
          console.log(error.response?.data)
        }
      })


  }


  return (
    <Form onSubmit={handleSubmit(submit)} className="login-container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className='login-element'
          type="email"
          placeholder="Enter email"
          {...register('email')}
        />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>

        <Form.Control
          className='login-element'
          type="password"
          placeholder="Password"
          {...register('password')}
        />

      </Form.Group>

      <Button variant="primary" type="submit" className='login-button'>
        Submit
      </Button>
    </Form>
  );
};

export default Login;