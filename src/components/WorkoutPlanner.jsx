import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function WorkoutPlanner() {
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Define state for userName, userId, and modal visibility
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [showModal, setShowModal] = useState(false); // Modal state

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const extractedUserName =
                    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                const extractedUserId =
                    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

                setUserName(extractedUserName);
                setUserId(extractedUserId);
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        } else {
            setShowModal(true); // Show the modal if no token is found
        }
    }, [token]); // Runs when token changes

    function handleSignInRedirect() {
        navigate("/login");
    }

    return (
        <>
            {/* Modal for not signed in */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to sign in to access the workout planner.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate("/")}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSignInRedirect}>
                        Go to Sign In
                    </Button>
                </Modal.Footer>
            </Modal>

            {token && (
                <div>
                    <legend className="mb-2 mt-2">
                        Welcome, {userName ? `${userName} ` : ""}
                    </legend>
                    <Button variant="light" className="mt-5" onClick={() => navigate("/")}>Back</Button>
                </div>
            )}
        </>
    );
}

export default WorkoutPlanner;
