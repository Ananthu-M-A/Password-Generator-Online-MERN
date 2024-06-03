import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../contexts/AuthContext"
import { useEffect } from "react";


function Header() {
    const navigate = useNavigate()
    const { isLoggedIn } = useAppContext();
    const { pathname } = useLocation();

    useEffect(() => {

    }, [isLoggedIn]);

    return (
        <div className="bg-headerBg py-6">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <h1 className="text-white text-4xl font-bold cursor-pointer">Password Generator Online</h1>
                <div className="flex gap-10 mr-2">
                    {(pathname === '/create-account' || pathname === '/user-login') &&
                        <h1 onClick={() => navigate('/')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Guest Home</h1>}
                    {(pathname === '/create-account' || (pathname === '/' && !isLoggedIn) || (pathname === '/generated-password' && !isLoggedIn)) &&
                        <h1 onClick={() => navigate('/user-login')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Log In</h1>}
                    {(pathname === '/user-login' || (pathname === '/' && !isLoggedIn)) &&
                        <h1 onClick={() => navigate('/create-account')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Sign Up</h1>}
                    {isLoggedIn &&
                        <h1 onClick={() => navigate('/generate-password')}
                            className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">User</h1>}
                </div>
            </div>
        </div>
    )
}

export default Header
