import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function WorkoutPlanner() {
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    // User state
    const [userId, setUserId] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newWorkout, setNewWorkout] = useState({ name: "", status: "In Progress" });
    const [editWorkout, setEditWorkout] = useState(null);
    const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false); // State for Add Workout Modal

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                fetchWorkouts(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        } else {
            setShowModal(true);
        }
    }, [token]);

    // Fetch Workouts
    const fetchWorkouts = async (userId) => {
        try {
            const response = await axios.get(`https://localhost:7182/api/Workouts/GetWorkouts/${userId}`);
            setWorkouts(response.data);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };

    // Handle Workout Submission
    const handleCreateWorkout = async () => {
        try {
            const response = await axios.post("https://localhost:7182/api/Workouts/CreateWorkout", {
                ...newWorkout,
                userId
            });
            setWorkouts([...workouts, response.data]);
            setShowAddWorkoutModal(false); // Close the modal after creating the workout
            setNewWorkout({ name: "", status: "In Progress" }); // Reset form
        } catch (error) {
            console.error("Error creating workout:", error);
        }
    };

    // Update Workout
    const handleUpdateWorkout = async () => {
        try {
            const response = await axios.put(`https://localhost:7182/api/Workouts/UpdateWorkout/${editWorkout.id}`, editWorkout);
            setWorkouts(workouts.map(w => (w.id === editWorkout.id ? response.data : w))); // Update specific workout in state
            setEditWorkout(null); // Close the modal
        } catch (error) {
            console.error("Error updating workout:", error);
        }
    };

    // Handle status change and update status in DB
    const handleStatusChange = async (workout, updatedStatus) => {
        try {
            // Send the entire workout object with the updated status
            const response = await axios.put(
                `https://localhost:7182/api/Workouts/UpdateWorkout/${workout.id}`,
                {
                    id: workout.id,  // Send the Id of the workout
                    name: workout.name,  // Send the current name
                    status: updatedStatus  // Only update the status
                }
            );
            // Update the workout status locally
            setWorkouts(workouts.map((w) =>
                w.id === workout.id ? { ...w, status: updatedStatus } : w
            ));
        } catch (error) {
            console.error('Error updating workout status:', error);
        }
    };

    // Delete Workout
    const handleDeleteWorkout = async (id) => {
        try {
            await axios.delete(`https://localhost:7182/api/Workouts/DeleteWorkout/${id}`);
            setWorkouts(workouts.filter((w) => w.id !== id));
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    return (
        <>
            {/* Modal for not signed in */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>You need to sign in to access the workout planner.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate("/")}>Close</Button>
                    <Button variant="primary" onClick={() => navigate("/login")}>Go to Sign In</Button>
                </Modal.Footer>
            </Modal>

            {token && (
                <div className="p-4">
                    <div>
                        <Button variant="light" className="mb-4" onClick={() => navigate("/")}>Back</Button>
                    </div>

                    {/* Button to open Add Workout Modal */}
                    <Button variant="primary" className="mb-3" onClick={() => setShowAddWorkoutModal(true)}>
                        Add Workout
                    </Button>

                    {/* Add Workout Modal */}
                    <Modal show={showAddWorkoutModal} onHide={() => setShowAddWorkoutModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Workout</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Workout Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newWorkout.name}
                                        onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                                        placeholder="Enter workout name"
                                    />
                                </Form.Group>
                                <Button variant="primary" className="mt-2" onClick={handleCreateWorkout}>Add Workout</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Workouts Block Layout */}
                    <Row>
                        {workouts.map((workout) => (
                            <Col md={4} key={workout.id} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{workout.name}</Card.Title>

                                        {/* Status in a block with custom styling */}
                                        <div style={{
                                            backgroundColor: '#f0f0f0',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}>
                                            {workout.status}
                                        </div>

                                        <div className="mt-2">
                                            <Button variant="warning" className="me-2" onClick={() => setEditWorkout(workout)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteWorkout(workout.id)}>Delete</Button>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </Col>
                        ))}
                    </Row>

                    {editWorkout && (
                        <Modal show={true} onHide={() => setEditWorkout(null)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Workout</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Workout Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editWorkout.name}
                                            onChange={(e) => setEditWorkout({ ...editWorkout, name: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Workout Status</Form.Label>
                                        <Form.Select
                                            value={editWorkout.status}
                                            onChange={(e) => setEditWorkout({ ...editWorkout, status: e.target.value })}
                                        >
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                            <option>Incomplete</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant="primary" className="mt-2" onClick={handleUpdateWorkout}>Save Changes</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
            )}
        </>
    );
}

export default WorkoutPlanner;
