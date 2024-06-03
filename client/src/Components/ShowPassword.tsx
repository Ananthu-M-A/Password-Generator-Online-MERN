import axios from "axios";
import { FormEvent } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AuthContext";

function ShowPassword() {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useAppContext()

  const {
    newPassword,
    passwordLength,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols } = location.state

  const reGeneratePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const backendURL = import.meta.env.VITE_API_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/guest/generate-password`, {
        passwordLength,
        includeLowercase,
        includeUppercase,
        includeNumbers,
        includeSymbols
      });
      if (response.data) {
        showToast({ message: "New password generated!", type: "SUCCESS" })
        let newPassword = response.data.newPassword;
        navigate('/generated-password', {
          state: {
            newPassword,
            passwordLength,
            includeLowercase,
            includeUppercase,
            includeNumbers,
            includeSymbols
          }
        })
      }
    } catch (error) {
      showToast({ message: "Error Generating password!", type: "ERROR" })
      console.error('Error Generating password:', error);
    }
  }

  const copyPassword = async () => {
    navigator.clipboard.writeText(newPassword).then(() => {
      showToast({ message: "Password copied to clipboard!", type: "SUCCESS" })
    }).catch(err => {
      showToast({ message: "Could not copy text!", type: "ERROR" })
      console.error('Could not copy password', err);
    });
  }

  return (
    <div className="bg-img h-screen bg-cover bg-center flex">
      <div className="w-1/2" />
      <div className="w-1/2 m-5 flex flex-col justify-center">
        <h1 className="text-white text-2xl mb-5">
          Your new secure password has been successfully generated! This password is designed to keep your online accounts safe by combining various character types and ensuring a strong, random composition.
        </h1>
        <div className="relative mb-4">
          <input
            id="pswd-length"
            type="text"
            value={newPassword}
            disabled
            className="mt-1 p-5 bg-white text-black rounded border w-full text-4xl font-bold pr-10 text-center"
          />
          <FaRegCopy onClick={copyPassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl hover:text-buttonBg cursor-pointer"
          />
        </div>
        <div className="flex justify-center gap-5">
          <button onClick={reGeneratePassword}
            className="bg-buttonBg text-black font-bold py-2 px-4 rounded hover:bg-headerBg hover:text-white transition duration-300 cursor"
          >
            Generate New Password
          </button>
          <button onClick={() => navigate('/')}
            className="bg-buttonBg text-black font-bold py-2 px-4 rounded hover:bg-headerBg hover:text-white transition duration-300 cursor"
          >
            Go Home
          </button>
        </div>
        <div className="flex justify-center">
          <h1 onClick={() => navigate('/create-account')}
            className="text-white text-lg font-semibold mt-2 hover:underline hover:cursor-pointer hover:text-buttonBg">
            Create an Account
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="text-white text-sm">
            For Secure storage, Easy access & Password management
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowPassword;
