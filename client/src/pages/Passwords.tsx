import { useEffect } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import PasswordsList from "../components/PasswordsList"
import { useAppContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Passwords() {
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn ? navigate('/generated-passwords') : navigate('/');
    }, [isLoggedIn])


    return (
        <>
            <Header />
            <PasswordsList />
            <Footer />
        </>
    )
}

export default Passwords
