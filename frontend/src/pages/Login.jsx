import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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
        <div style={{ padding: "20px" }}>

            <h1>User Management Platform</h1>

            <h2>User Login</h2>

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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;