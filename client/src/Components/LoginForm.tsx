import { FormEvent, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className="bg-img h-screen bg-cover bg-center flex">
      <div className="w-1/3" />
      <div className="w-1/3 m-5 flex flex-col justify-center">
        <h1 className="text-white text-4xl font-semibold mb-2 flex justify-center">
          Login to Your Account
        </h1>
        <form className="m-5" onSubmit={loginUser}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block">
              <p className="flex justify-center">Enter Email Address</p>
              <input
                id="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-white block">
              <p className="flex justify-center">Enter Password</p>
              <input
                id="password"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
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
      <div className="w-1/3" />
    </div>
  );
}

export default LoginForm
