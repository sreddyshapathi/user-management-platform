import { useState } from "react";
import API from "../services/api";

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

    console.log(error);

    if (error.response) {
        alert(JSON.stringify(error.response.data));
    } else {
        alert(error.message);
    }

        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>User Management Platform</h1>

            <h2>User Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
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
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={form.mobile}
                    onChange={handleChange}
                />

                <br /><br />

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
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;