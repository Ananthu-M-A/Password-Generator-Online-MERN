import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AuthContext";

function SignupForm() {
  const [userData, setUserData] = useState({
    fullName: "", email: "", password: "", confirmPswd: ""
  });
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const backendURL = import.meta.env.VITE_API_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/create-account`, userData)
      if (response) {
        showToast({ message: "User created & logged in!", type: "SUCCESS" })
        console.log(response.data);
        navigate('/');
      }
    } catch (error) {
      showToast({ message: "Error in creating user!", type: "ERROR" })
      console.log(error);
    }
  }

  return (
    <div className="bg-img h-screen bg-cover bg-center flex">
      <div className="w-1/3" />
      <div className="w-1/3 m-5 flex flex-col justify-center">
        <h1 className="text-white text-4xl font-semibold mb-2 flex justify-center">
          Create an Account
        </h1>
        <form className="m-5" onSubmit={createAccount}>
          <div className="mb-4">
            <label htmlFor="fullname" className="text-white block">
              <p className="flex justify-center">Enter Full Name</p>
              <input
                id="fullname"
                name="fullName"
                type="text"
                onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block">
              <p className="flex justify-center">Enter Email Address</p>
              <input
                id="email"
                name="email"
                type="text"
                onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
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
                onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-pswd" className="text-white block">
              <p className="flex justify-center">Confirm Password</p>
              <input
                id="confirm-pswd"
                name="confirmPswd"
                type="password"
                onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
              />
            </label>
          </div>
          <div className="flex justify-center p-4">
            <button
              type="submit"
              className="bg-buttonBg text-black font-bold py-2 px-4 rounded hover:bg-headerBg hover:text-white transition duration-300"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/3" />
    </div>
  );
}

export default SignupForm
