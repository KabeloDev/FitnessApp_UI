import React, { useState } from "react";
import { Container, Row, Col, Button, Card, ListGroup, Offcanvas } from "react-bootstrap";
import { FaDumbbell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoFitness } from "react-icons/io5";
import { FaBars } from 'react-icons/fa';

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background container with blur effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://media.istockphoto.com/id/1130800361/photo/young-woman-listening-to-music-over-cell-phone-at-the-gym.jpg?s=612x612&w=0&k=20&c=iAdfzdZUMMfFK3ZQrdu9U9egoUqsycXKxebhY33qZQI=')`, // Replace with the path to your image
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(2px)', // Only blur the background
          zIndex: -1, // Make sure the background stays behind the content
        }}
      ></div>

      {/* Banner Section */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent dark background for the banner
        padding: '20px 0',
        textAlign: 'center',
        color: 'white',
        zIndex: 1, // Ensure it is above the blurred background
        position: 'sticky',
      }}>
        <h1 className="display-4 font-weight-bold" style={{
          background: 'linear-gradient(45deg, #ff6b6b, #f9a602, #ffd700)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          animation: 'glow 1.5s ease-in-out infinite alternate'
        }}>
          <Col md={1}>
          {/* Button with React-Bootstrap and a Sidebar Icon */}
          <Button onClick={handleShow} variant="secondary">
            <FaBars /> {/* Sidebar Icon */}
          </Button>
        </Col>
          Welcome to FitnessApp
        </h1>
        <p className="lead">Your journey to a healthier lifestyle starts here.</p>
      </div>

      {/* Main content */}
      <Container className="text-center mt-3" style={{ zIndex: 1, position: 'relative' }}>
        

        <Row className="mt-5 d-flex justify-content-center">
          <Col md={8}>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                  <Card.Body className="p-4 text-center">
                    <FaDumbbell size={60} className="text-primary mb-3" />
                    <Card.Title className="h4 font-weight-bold text-white">Workout Plans</Card.Title>
                    <Card.Text className="text-white">Find the best exercises tailored to your goals.</Card.Text>
                    <Button variant="primary" className="btn-lg shadow-sm hover-scale">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mb-4">
                <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                  <Card.Body className="p-4 text-center">
                    <FiUser size={60} className="text-success mb-3" />
                    <Card.Title className="h4 font-weight-bold text-white">Track Progress</Card.Title>
                    <Card.Text className="text-white">Monitor your fitness journey with ease.</Card.Text>
                    <Button variant="success" className="btn-lg shadow-sm hover-scale">Track Now</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mb-4">
                <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                  <Card.Body className="p-4 text-center">
                    <IoFitness size={60} className="text-danger mb-3" />
                    <Card.Title className="h4 font-weight-bold text-white">Nutrition Tips</Card.Title>
                    <Card.Text className="text-white">Get the best diet plans for your workouts.</Card.Text>
                    <Button variant="danger" className="btn-lg shadow-sm hover-scale">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        
      </Container>

      {/* Offcanvas Sidebar with contained background image */}
<Offcanvas 
  show={show} 
  onHide={handleClose} 
  placement="start" 
  style={{
    backgroundImage: `url('https://t3.ftcdn.net/jpg/02/85/28/36/360_F_285283630_DRK2w48tfFM2J1heFAfSi85tM9T8vpwz.jpg')`, // Replace with your image URL
    backgroundSize: 'contain', // Ensures the image is contained
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    backgroundPosition: 'center center', // Centers the image
  }}
>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Profile</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body >
</Offcanvas.Body>

</Offcanvas>

    </div>
  );
};

export default Home;
