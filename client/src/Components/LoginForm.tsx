import axios from "axios";
import { FormEvent, useState } from "react";
import { useAppContext } from "../contexts/AuthContext";

function LoginForm() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { showToast } = useAppContext()

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const backendURL = import.meta.env.VITE_API_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/login`, userData, {
        withCredentials: true
      })
      if (response) {
        showToast({ message: "User logged in!", type: "SUCCESS" })
        console.log(response.data);
        window.location.reload()
      }
    } catch (error) {
      showToast({ message: "Error in user login!", type: "ERROR" })
      console.log(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-img h-screen bg-cover bg-center flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/3" />
      <div className="w-full lg:w-1/3 m-5 flex flex-col justify-center">
        <h1 className="text-white text-3xl sm:text-4xl font-semibold mb-4 flex justify-center">
          Login to Your Account
        </h1>
        <form className="m-5" onSubmit={loginUser}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block">
              <p className="flex justify-center">Enter Email Address</p>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
                required
                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-white block">
              <p className="flex justify-center">Enter Password</p>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
                required
                minLength={12}
                maxLength={25}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{6,}$"
              />
            </label>
          </div>
          <div className="flex justify-center p-4">
            <button
              type="submit"
              className="bg-buttonBg text-black font-bold py-2 px-4 rounded hover:bg-headerBg hover:text-white transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="hidden lg:block lg:w-1/3" />
    </div>
  );
}

export default LoginForm
