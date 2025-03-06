import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Form, Alert, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Define state for user details
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
                const extractedUserId =
                    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

                setUserId(extractedUserId);
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            // Fetch user details from API
            axios.get(`https://localhost:7182/api/Users/GetUserById/${userId}`)
                .then((response) => {
                    setUserEmail(response.data.email);
                })
                .catch((error) => {
                    console.log("Error fetching user data:", error);
                });
        }
    }, [userId]); // Only run when userId is available

    function handleSaveChanges() {
        const payload = { username: userName, email: userEmail };

        axios.put(`https://localhost:7182/api/Users/UpdateUser/${userId}`, payload, {
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            setSuccess("Profile updated successfully!");
            setError("");
        })
        .catch((error) => {
            setError("Failed to update profile. Try again.");
            setSuccess("");
            console.log("Update error:", error);
        });
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="profile-page">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Row className="profile-container p-4">
                    {/* Left: Profile Picture */}
                    <Col md={4} className="text-center">
                        <Image 
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                            roundedCircle 
                            className="profile-image"
                        />
                        <h3 className="mt-3">{userName}</h3>
                        <p className="text-muted">{userEmail}</p>
                    </Col>

                    {/* Right: Editable User Info */}
                    <Col md={8}>
                        <h2 className="mb-4">Edit Profile</h2>

                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={userName} 
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    value={userEmail} 
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Button className="w-100 mb-3" variant="primary" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </Form>

                        {/* Log Out Button */}
                        <Button className="logout-btn" variant="danger" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Background Image with Blur */}
            <div className="profile-bg"></div>
            

            {/* Back Button */}
            <Button className="back-btn" variant="light" onClick={() => navigate("/")}>
                Back
            </Button>
        </div>
    );
}

export default Profile;
