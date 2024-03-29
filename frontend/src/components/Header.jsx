import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from "../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    const { user } = useSelector((state) => state.auth);

    return (
        <header className='container header'>
            <div className="logo">
                <Link to="/">Support Desk</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
