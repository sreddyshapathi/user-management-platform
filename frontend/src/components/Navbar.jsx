import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    User Management Platform
                </Link>

                <div className="navbar-nav">

                    <Link
                        className="nav-link"
                        to="/"
                    >
                        Login
                    </Link>

                    <Link
                        className="nav-link"
                        to="/register"
                    >
                        Register
                    </Link>

                    <Link
                        className="nav-link"
                        to="/forgot-password"
                    >
                        Forgot Password
                    </Link>

                    <Link
                        className="nav-link"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;