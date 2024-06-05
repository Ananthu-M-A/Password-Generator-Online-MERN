import axios from "axios";
import { FormEvent, useState } from "react";
import { useAppContext } from "../contexts/AuthContext";

function SignupForm() {
  const [userData, setUserData] = useState({
    fullName: "", email: "", password: "", confirmPswd: ""
  });
  const { showToast } = useAppContext();

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();
    const { password, confirmPswd, fullName, email } = userData;

    if (password !== confirmPswd) {
      showToast({ message: "Passwords do not match!", type: "ERROR" });
      console.error("Passwords do not match!");
      return;
    }

    try {
      const backendURL = import.meta.env.VITE_API_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/create-account`, { fullName, email, password }, {
        withCredentials: true
      });

      if (response.status === 201) {
        showToast({ message: "User created & logged in!", type: "SUCCESS" });
        console.log(response.data);
        window.location.reload();
      } else {
        showToast({ message: "Failed to create user!", type: "ERROR" });
        console.error(response.data);
      }
    } catch (error) {
      showToast({ message: "Error in creating user!", type: "ERROR" });
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-img h-screen bg-cover bg-center flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/3" />
      <div className="w-full lg:w-1/3 m-5 flex flex-col justify-center">
        <h1 className="text-white text-xl sm:text-4xl font-semibold mb-2 flex justify-center lg:justify-center">
          Create an Account
        </h1>
        <form className="m-5" onSubmit={createAccount}>
          <div className="mb-4">
            <label htmlFor="fullname" className="text-white block">
              <p className="flex justify-center lg:justify-start">Enter Full Name</p>
              <input
                id="fullname"
                name="fullName"
                type="text"
                onChange={handleChange}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
                required minLength={4}
                maxLength={30}
                pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block">
              <p className="flex justify-center lg:justify-start">Enter Email Address</p>
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
              <p className="flex justify-center lg:justify-start">Enter Password</p>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
                required
                minLength={12}
                maxLength={25}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{12,25}$"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPswd" className="text-white block">
              <p className="flex justify-center lg:justify-start">Confirm Password</p>
              <input
                id="confirmPswd"
                name="confirmPswd"
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
              Create Account
            </button>
          </div>
        </form>
      </div>
      <div className="hidden lg:block lg:w-1/3" />
    </div>
  );
}

export default SignupForm;
