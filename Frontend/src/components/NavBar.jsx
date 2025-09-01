import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import axios from "../axios/axiosConfig"

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = async() => {
        await axios('/auth/logout');
        dispatch(logout());
        navigate('/');     
    };
    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md flex justify-between items-center px-5 py-3 md:px-10">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer tracking-wide" onClick={() => navigate('/')}>
                TurfBook
            </h1>

            <div>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Login / SignUp
                    </button>
                )}
            </div>
        </nav>
    )
}

export default NavBar