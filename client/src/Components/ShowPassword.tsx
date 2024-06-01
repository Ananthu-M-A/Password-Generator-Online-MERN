import { FaRegCopy } from "react-icons/fa";

function ShowPassword() {

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
            value="ASDFGH123456asdfgh12345678"
            disabled
            className="mt-1 p-5 bg-white text-black rounded border w-full text-4xl font-bold pr-10"
          />
          <FaRegCopy 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl hover:text-buttonBg cursor-pointer" />
        </div>
        <div className="flex justify-center gap-5">
          <button
            className="bg-buttonBg text-black font-bold py-2 px-4 rounded hover:bg-headerBg hover:text-white transition duration-300 cursor"
          >
            Generate New Password
          </button>
          <button
            className="bg-buttonBg text-black font-bold py-2 px-4 rounded hover:bg-headerBg hover:text-white transition duration-300 cursor"
          >
            Go Home
          </button>
        </div>
        <div className="flex justify-center">
          <h1 className="text-white text-lg font-semibold mt-2 hover:underline hover:cursor-pointer hover:text-buttonBg">
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
