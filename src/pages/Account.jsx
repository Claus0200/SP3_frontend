import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../assets/apiFacade";

function Account() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await facade.fetchData(); // Wait for the promise to resolve
                console.log(user); // Log the user data
                setRoles(user.roles); // Set the roles array
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Navigate based on roles
    useEffect(() => {
        if (roles.includes("ADMIN")) {
            console.log("Navigating to /admin");
            navigate("/admin");
        } else if (roles.includes("USER")) {
            console.log("Navigating to /user");
            navigate("/user");
        }
    }, [roles, navigate]);

    return (
        <>
            <h1>Account</h1>
            <p>This is the account page.</p>
        </>
    );
}

export default Account;