import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/login",
                form
            );

            if (response.data === "Login Successful") {

                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert(response.data);
            }

        } catch (error) {

            if (error.response) {

                alert(
                    JSON.stringify(
                        error.response.data
                    )
                );

            } else {

                alert("Login Failed");
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <div className="card shadow">

                            <div className="card-header bg-primary text-white">

                                <h3>User Login</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={form.username}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>

                                </form>

                                <hr />

                                <Link to="/register">
                                    Register Here
                                </Link>

                                <br />

                                <Link to="/forgot-password">
                                    Forgot Password
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Login;