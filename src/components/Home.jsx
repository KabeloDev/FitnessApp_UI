import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Offcanvas, ListGroup } from "react-bootstrap";
import { FaDumbbell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoFitness } from "react-icons/io5";
import { FaBars } from 'react-icons/fa';
import { Carousel } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';


const Home = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalClose = () => setModalShow(null);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url('https://media.istockphoto.com/id/1130800361/photo/young-woman-listening-to-music-over-cell-phone-at-the-gym.jpg?s=612x612&w=0&k=20&c=iAdfzdZUMMfFK3ZQrdu9U9egoUqsycXKxebhY33qZQI=')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'blur(2px)',
        zIndex: -1,
      }}></div>

      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '20px 0', textAlign: 'center', color: 'white' }}>
        <h1 className="display-4 font-weight-bold" style={{
          background: 'linear-gradient(45deg, #ff6b6b, #f9a602, #ffd700)',
          backgroundClip: 'text',
          textFillColor: 'transparent'
        }}>
          <Col md={1}>
            <Button onClick={handleShow} variant="secondary">
              <FaBars />
            </Button>
          </Col>
          FitnessApp
        </h1>
        <p className="lead">Your journey to a healthier lifestyle starts here.</p>
      </div>

      <Container className="text-center mt-3" style={{ position: 'relative' }}>
        <Row className="mt-5 d-flex justify-content-center">
          <Col md={8}>
            <Row>
              {[{
                title: "Workout Plans",
                icon: <FaDumbbell size={60} className="text-primary mb-3" />,
                text: "Find the best exercises tailored to your goals.",
                variant: "primary",
                modalText: "Explore customized workout plans designed for all fitness levels."
              }, {
                title: "Track Progress",
                icon: <FiUser size={60} className="text-success mb-3" />,
                text: "Monitor your fitness journey with ease.",
                variant: "success",
                modalText: "Track your workouts, measure progress, and stay motivated."
              }, {
                title: "Nutrition Tips",
                icon: <IoFitness size={60} className="text-danger mb-3" />,
                text: "Get the best diet plans for your workouts.",
                variant: "danger",
                modalText: "Discover nutritional strategies that complement your fitness journey."
              }].map((item, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <Card.Body className="p-4 text-center">
                      {item.icon}
                      <Card.Title className="h4 font-weight-bold text-white">{item.title}</Card.Title>
                      <Card.Text className="text-white">{item.text}</Card.Text>
                      <Button variant={item.variant} className="btn-lg shadow-sm hover-scale" onClick={() => setModalShow(index)}>
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <div className="hero-section mb-5" style={{
          filter: 'blur(0.5px)',
          padding: '100px 0',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(136, 106, 106, 0.6), rgba(65, 58, 46, 0.6))', // Added transparency with alpha value 0.6
          borderRadius: '30px',  // Curved edges
          overflow: 'hidden'  // Ensure content doesn't overflow the rounded corners
        }}>
          <h1 className="display-4 text-white font-weight-bold">Reach Your Fitness Goals with Ease</h1>
          <p className="lead text-white mb-4">Track, plan, and achieve your fitness journey like never before.</p>
          <Button variant="danger" size="lg" className="btn-lg shadow-lg">Start Your Journey Now</Button>
        </div>

        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url('https://www.24hourfitness.com/24life/recover/2017/media_15ebf180367da7392a23b3743d1a23be16b4dad2a.jpeg?width=1200&format=pjpg&optimize=medium')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'blur(2px)',
            zIndex: -1,
          }}></div>


          {/* YouTube Video Blocks */}
          <div className="my-5">
            <h3 className="text-center mb-4 text-white">Fitness Tutorials</h3>

            <div className="row">
              {/* YouTube Video 1 */}
              <div className="col-md-4 mb-4">
                <div className="video-block">
                  <iframe width="350" height="300" src="https://www.youtube.com/embed/EQPNDlRq5Ps" title="Big BACK workout 💪🏽 #shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  <div className="video-caption mt-3">
                  </div>
                </div>
              </div>

              {/* YouTube Video 2 */}
              <div className="col-md-4 mb-4">
                <div className="video-block">
                  <iframe width="350" height="300" src="https://www.youtube.com/embed/KW_Imfnb-Xo" title="📌LOWER ABS EXERCISES 👉Adding these into your routine will help strengthen and tone your lower abs." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  <div className="video-caption mt-3">
                  </div>
                </div>
              </div>

              {/* YouTube Video 3 */}
              <div className="col-md-4 mb-4">
                <div className="video-block">
                  <iframe width="350" height="300" src="https://www.youtube.com/embed/lk10MSbrs-w" title="BEGINNER FULL BODY WORKOUT #shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  <div className="video-caption mt-3">
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social media footer */}
          <div className="social-footer text-center mt-5" style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '20px 0',
            position: 'relative',
            width: '100%',
            bottom: 0,
            borderRadius: '50px'
          }}>
            <h5>Follow Us on Social Media</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaFacebook size={30} className="text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaTwitter size={30} className="text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaInstagram size={30} className="text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaYoutube size={30} className="text-white" />
              </a>
            </div>
            <p>&copy; 2025 FitnessApp. All Rights Reserved.</p>
          </div>


        </div>







      </Container>

      <Offcanvas show={show} onHide={handleClose} placement="start" style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/02/85/28/36/360_F_285283630_DRK2w48tfFM2J1heFAfSi85tM9T8vpwz.jpg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
        <Offcanvas.Header closeButton>
          <i class="bi bi-person-circle fs-1"></i>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup.Item className="mt-5 mb-5"><Button variant="secondary">User Profile</Button></ListGroup.Item>
          <ListGroup.Item className="mb-5"><Button variant="secondary">Exercise Library</Button></ListGroup.Item>
          <ListGroup.Item className="mb-5"><Button variant="secondary">Workout Planner</Button></ListGroup.Item>
          <ListGroup.Item><Button variant="secondary">Dashboard</Button></ListGroup.Item>
        </Offcanvas.Body>
      </Offcanvas>

      {[
        {
          title: "Workout Plans",
          text: "Explore customized workout plans designed for all fitness levels. Find structured routines based on your fitness level and goals, from beginner-friendly workouts to advanced strength training regimens.",
          images: [
            "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg",
            "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
            "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg"
          ]
        },
        {
          title: "Track Progress",
          text: "Monitor your workouts and stay on track with your fitness goals. Keep a log of your progress, set achievable targets, and analyze workout data to maximize performance.",
          images: [
            "https://images.pexels.com/photos/28080/pexels-photo.jpg",
            "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg",
            "https://images.pexels.com/photos/3768891/pexels-photo-3768891.jpeg"
          ]
        },
        {
          title: "Nutrition Tips",
          text: "Discover nutritional strategies that complement your fitness journey. Get expert guidance on meal planning, macronutrient balance, and food choices to fuel your workouts efficiently.",
          images: [
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            "https://images.pexels.com/photos/593579/pexels-photo-593579.jpeg",
            "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"
          ]
        }
      ].map((item, index) => (
        <Modal
          show={modalShow === index}
          onHide={handleModalClose}
          key={index}
        //fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title>{item.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center">
            <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", width: "80%", border: "none" }} className="shadow-lg">
              <Carousel>
                {item.images.map((img, imgIndex) => (
                  <Carousel.Item key={imgIndex}>
                    <img src={img} className="d-block w-100" style={{ maxHeight: "300px", objectFit: "cover" }} alt={`Slide ${imgIndex + 1}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body className="text-center">
                <Card.Text>{item.text}</Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ))}


    </div>
  );
};

export default Home;
