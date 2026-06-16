import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        newPassword: ""
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
                "/forgot-password",
                form
            );

            alert(response.data);

        } catch (error) {

            if (error.response) {
                alert(JSON.stringify(error.response.data));
            } else {
                alert("Password Reset Failed");
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>User Management Platform</h1>

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Reset Password
                </button>

            </form>

            <br />

            <Link to="/">
                Back To Login
            </Link>

        </div>
    );
}

export default ForgotPassword;