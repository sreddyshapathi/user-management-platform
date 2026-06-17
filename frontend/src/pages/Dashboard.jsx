import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await API.get(
                "/profile/sudhakar"
            );

            setProfile(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load profile");
        }
    };

    const logout = () => {

        navigate("/");
    };

    if (!profile) {

        return <h3>Loading...</h3>;
    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h2>User Management Dashboard</h2>

                    </div>

                    <div className="card-body">

                        <h3>
                            Welcome {profile.firstName}
                        </h3>

                        <hr />

                        <p>
                            <strong>First Name:</strong>{" "}
                            {profile.firstName}
                        </p>

                        <p>
                            <strong>Last Name:</strong>{" "}
                            {profile.lastName}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {profile.email}
                        </p>

                        <p>
                            <strong>Mobile:</strong>{" "}
                            {profile.mobile}
                        </p>

                        <p>
                            <strong>Username:</strong>{" "}
                            {profile.username}
                        </p>

                        <p>
                            <strong>Created At:</strong>{" "}
                            {profile.createdAt}
                        </p>

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;