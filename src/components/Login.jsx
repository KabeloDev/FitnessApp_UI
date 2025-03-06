import axios from 'axios';
import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {

    var navigate = useNavigate();

    const [error, setError] = useState("");

    const username = useRef("");
    const password = useRef("");

    function handleLogin (){
        var payload = {
            "username" : username.current.value,
            "password" : password.current.value,
        }

        if(!username.current.value || !password.current.value ){
            setError("Please fill in all fields");
            return;
        }

        if (password.current.value.length < 4){
            setError("Password should be at least 4 characters");
            return;
        }

        axios.post("https://localhost:7182/api/Users/Login", payload, {
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            console.log("User logged in: ", response.data.token);
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
            setError("Invalid credentials")
        });
    }

  return (
    <>
    <legend className='mt-3 mb-3'>Log In</legend>
    {error && <Alert variant="info">{error}</Alert>}    
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={username}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  ref={password}/>
      </Form.Group>

     
      
      <Button className='me-2' variant="primary" onClick={handleLogin}>
        Submit
      </Button>
      <Button variant="primary" onClick={() => navigate("/register")}>
        Register
      </Button>
    </Form>

    </>
  );
}

export default Login;