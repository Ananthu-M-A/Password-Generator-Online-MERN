import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../contexts/AuthContext"
import { useEffect } from "react";
import axios from "axios";


function Header() {
    const navigate = useNavigate()
    const { isLoggedIn, showToast } = useAppContext();
    const { pathname } = useLocation();

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn]);

    const logoutUser = async () => {
        try {
            const backendURL = import.meta.env.VITE_API_BACKEND_URL;
            const response = await axios.post(`${backendURL}/api/user/logout`, null, {
                withCredentials: true
            })
            if (response) {
                window.location.reload()
                navigate('/');
                showToast({ message: "User logged out!", type: "SUCCESS" })
            }
        } catch (error) {
            showToast({ message: "Error in user logout!", type: "ERROR" })
            console.log(error);
        }
    }
    

    return (
        <div className="bg-headerBg py-6">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <h1 onClick={() => navigate('/')}
                    className="text-white text-4xl font-bold cursor-pointer mb-4 sm:mb-0">Password Generator Online</h1>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mr-2">
                    {(pathname === '/create-account' || pathname === '/user-login') &&
                        <h1 onClick={() => navigate('/')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Guest Home</h1>}
                    {(pathname === '/create-account' || (pathname === '/' && !isLoggedIn) || (pathname === '/generated-password' && !isLoggedIn)) &&
                        <h1 onClick={() => navigate('/user-login')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Log In</h1>}
                    {(pathname === '/user-login' || pathname === '/' && !isLoggedIn) &&
                        <h1 onClick={() => navigate('/create-account')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Sign Up</h1>}
                    {isLoggedIn && (pathname === '/' || pathname === '/generated-password') && (
                        <h1 onClick={() => navigate('/generated-passwords')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Passwords</h1>
                    )}
                    {isLoggedIn &&
                        <h1 onClick={logoutUser}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Logout</h1>}
                </div>
            </div>
        </div>
    );

}

export default Header
