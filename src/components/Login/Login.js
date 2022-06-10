import React, { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';

function Login(props) {
  const [state,setState]=useState({
    username:"",
    password:""
  })
  const SubmitHandler =(e)=>{
      props.setUser(state.username)
       props.handleLogin();
  }


  return (
    <Container className="outer">
    <div className="inner">
        <Form onSubmit={(e)=>SubmitHandler(e)}>
            <h2>Login</h2>
            <Form.Group controlId="username" className="form-group">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="name" 
                                placeholder="username" 
                                className="form-control" onChange={(e)=>{setState({username:e.target.value})}}/>
            </Form.Group>

            <Form.Group controlId="password" className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password"  type="password"
                 placeholder="password" className="form-control"
                  onChange={(e)=>{setState({password:e.target.value})}}/>
            </Form.Group>
            
            <Button className="btn btn-dark btn-lg btn-block" variant="hidden" type="submit">Login</Button>
        </Form>
    </div>                        
</Container>
  )
}

export default Login