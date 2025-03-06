import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Define state for userName and userId
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

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
        }
    }, [token]); // Runs when token changes

    return (
        <>
            <legend className="mb-2 mt-2">
                Welcome, {userName ? `${userName} ` : ""}
            </legend>
            <Button variant="light" className="mt-5" onClick={() => navigate("/")}>Back</Button>
        </>
    );
}

export default Dashboard;
