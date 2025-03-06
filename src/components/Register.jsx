import axios from 'axios';
import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Register() {

    var navigate = useNavigate();

    const [error, setError] = useState("");

    const email = useRef("");
    const username = useRef("");
    const password = useRef("");

    function handleRegister (){
        var payload = {
            "email" : email.current.value,
            "username" : username.current.value,
            "password" : password.current.value
        }

        if(!email.current.value || !username.current.value || !password.current.value ){
            setError("Please fill in all fields");
            return;
        }

        if (!email.current.value.includes('@')){
            setError("Email should have @ symbol");
            return;
        }

        if (password.current.value.length < 4){
            setError("Password should be at least 4 characters");
            return;
        }



        axios.post("https://localhost:7182/api/Users/Register", payload, {
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {
            console.log("User registered: ", response.data);
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
        });
    }

  return (
    <>
    <legend className='mt-3 mb-3'>Register</legend>
    <div className='mb-2'>
        {error && <Alert variant="info">{error}</Alert>}    
    </div>
    <Form>
        
    <Form.Group className="mb-3" controlId="email">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" ref={email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={username}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  ref={password}/>
      </Form.Group>

     
      
      <Button className='me-2' variant="primary" onClick={handleRegister}>
        Submit
      </Button>
      <Button variant="primary" onClick={() => navigate("/login")}>
        Log In
      </Button>
    </Form>

    </>
  );
}

export default Register;