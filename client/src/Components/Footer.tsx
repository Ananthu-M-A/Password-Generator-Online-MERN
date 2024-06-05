import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return (
        <div className="bg-headerBg py-4">
            <div className="container mx-auto flex flex-col items-center">
                <h1
                    onClick={() => navigate('/')}
                    className="text-white text-3xl sm:text-4xl font-bold mb-4 cursor-pointer text-center">
                    Password Generator Online
                </h1>
                <p className="text-white text-xs sm:text-sm text-center">
                    &copy; 2024 Password Generator Online. Powered by Smart-Depot. All rights reserved.
                </p>
            </div>
        </div>
    );
}
export default Footer;
