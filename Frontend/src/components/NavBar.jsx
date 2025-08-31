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
        <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                TurfBook
            </h1>

            <div>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                    >
                        Login / SignUp
                    </button>
                )}
            </div>
        </nav>
    )
}

export default NavBar