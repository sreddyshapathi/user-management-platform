import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Register() {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
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
                "/register",
                form
            );

            alert(response.data);

            setForm({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                username: "",
                password: ""
            });

        } catch (error) {

            if (error.response) {

                alert(
                    JSON.stringify(
                        error.response.data
                    )
                );

            } else {

                alert("Registration Failed");
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-8">

                        <div className="card shadow">

                            <div className="card-header bg-success text-white">

                                <h3>User Registration</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mobile"
                                            name="mobile"
                                            value={form.mobile}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            name="username"
                                            value={form.username}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Register
                                    </button>

                                </form>

                                <hr />

                                <Link to="/">
                                    Already Have Account? Login
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Register;