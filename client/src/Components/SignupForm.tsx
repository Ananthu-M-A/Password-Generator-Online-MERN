import { FormEvent, useState } from "react";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");

  const createAccount = (e: FormEvent) => {
    e.preventDefault();
    console.log(fullName, email, password, confirmPswd);
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
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 p-2 bg-white text-black rounded border w-full"
              />
            </label>
          </div>
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
          <div className="mb-4">
            <label htmlFor="confirm-pswd" className="text-white block">
              <p className="flex justify-center">Confirm Password</p>
              <input
                id="confirm-pswd"
                type="text"
                onChange={(e) => setConfirmPswd(e.target.value)}
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
