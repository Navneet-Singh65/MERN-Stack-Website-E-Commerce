import React, { useState } from 'react';
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
import { Form,FormControl,Button,Container } from 'react-bootstrap'
     
export default function Register() {
  const      [username, setUserName] = useState('');
  const      [password, setPassword] = useState('');    
  const      [address, setAddress] = useState('');    
  const      [phone, setPhone] = useState('');    
  const      [email, setEmail] = useState('');    





  function handleChange1(e)  {
      
    setUserName(e.target.value);
  };
  function handleChange2(e)  {
       
    setPassword(e.target.value);
  }; 
  function handleChange3(e)  {
       
    setAddress(e.target.value);
  }; 
  function handleChange4(e)  {
       
    setPhone(e.target.value);
  }; 
  function handleChange5(e)  {
       
    setEmail(e.target.value);
  }; 
  async function mysubmit() 
    {
  const data={"username":username,"password":password,"address":address,"phone":phone,"email":email};

     const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('http://localhost:4200/register', config)    
    const json = await response.json();
    if(json.length !=0)
    {
setUserName("");
setPassword("");
setAddress("");
setPhone("");
setEmail("");
alert("user registerd");      
    }
  }
  return (
     <div>
       <h1 align="Center">New User Registration</h1>
       <br/><br/><br/>
<Container>

<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter Username" 
          value={username}
          onChange={handleChange1}

/>
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"
 value={password}
          onChange={handleChange2}
 />
  </Form.Group>


  

  <Form.Group className="mb-3" controlId="address">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder="address"
 value={address}
          onChange={handleChange3}
 />
  </Form.Group>

  <Form.Group className="mb-3" controlId="phone">
    <Form.Label>Phone</Form.Label>
    <Form.Control type="text" placeholder="phone"
 value={phone}
          onChange={handleChange4}
 />
  </Form.Group>

  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" placeholder="email"
 value={email}
          onChange={handleChange5}
 />
  </Form.Group>

    <Button variant="primary" type="button" onClick={mysubmit}>
    Submit
  </Button>
</Form>



</Container>

      </div>
      
                 
  );
}
