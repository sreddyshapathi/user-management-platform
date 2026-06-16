import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h2>User Management Dashboard</h2>

                    </div>

                    <div className="card-body">

                        <h3>Welcome Sudhakar</h3>

                        <hr />

                        <p>
                            Frontend : React
                        </p>

                        <p>
                            Backend : Spring Boot
                        </p>

                        <p>
                            Database : PostgreSQL
                        </p>

                        <p>
                            Environment : Local Development
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