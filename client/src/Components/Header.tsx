function Header() {
    return (
        <div className="bg-headerBg py-6">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <h1 className="text-white text-4xl font-bold cursor-pointer">Password Generator Online</h1>
                <div className="flex gap-10 mr-2">
                    <h1 className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Log In</h1>
                    <h1 className="text-white text-xl font-bold transition duration-300 hover:text-black cursor-pointer">Sign Up</h1>
                </div>
            </div>
        </div>
    )
}

export default Header
