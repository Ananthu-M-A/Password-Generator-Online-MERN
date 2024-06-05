import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AuthContext';

function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => setPasswordLength(parseInt(e.target.value));
  const handleUppercaseChange = (e: ChangeEvent<HTMLInputElement>) => setIncludeUppercase(e.target.checked);
  const handleLowercaseChange = (e: ChangeEvent<HTMLInputElement>) => setIncludeLowercase(e.target.checked);
  const handleNumbersChange = (e: ChangeEvent<HTMLInputElement>) => setIncludeNumbers(e.target.checked);
  const handleSymbolsChange = (e: ChangeEvent<HTMLInputElement>) => setIncludeSymbols(e.target.checked);

  const generatePassword = async (e: FormEvent) => {
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

  return (
    <div className="bg-img h-screen bg-cover bg-center flex flex-col lg:flex-row">
      <div className="lg:w-1/2" />
      <div className="lg:w-1/2 m-5 flex flex-col justify-center">
        <h1 className="text-white text-xl sm:text-2xl mb-5">
          Welcome to our Secure Password Generator! Creating strong, unique passwords is essential for protecting your online accounts. Our tool allows you to easily generate random passwords based on your specific needs.
        </h1>
        <form className="m-5" onSubmit={generatePassword}>
          <div className="mb-4">
            <label htmlFor="pswd-length" className="text-white block">
              <p>Enter required password length (12-25)</p>
              <input
                id="pswd-length"
                type="number"
                value={passwordLength}
                onChange={handleLengthChange}
                min="12"
                max="25"
                className="mt-1 p-2 bg-white text-black rounded border w-full sm:w-1/2"
              />
            </label>
          </div>
          <p className="text-white">Check password criteria (Recommended default)</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div className="mb-4 sm:w-1/4">
              <label htmlFor="uppercase" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={includeUppercase}
                  onChange={handleUppercaseChange}
                  className="form-checkbox h-5 w-5"
                />
                <p className="text-white">Uppercase</p>
              </label>
            </div>
            <div className="mb-4 sm:w-1/4">
              <label htmlFor="lowercase" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={includeLowercase}
                  onChange={handleLowercaseChange}
                  className="form-checkbox h-5 w-5"
                />
                <p className="text-white">Lowercase</p>
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div className="mb-4 sm:w-1/4">
              <label htmlFor="numbers" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="numbers"
                  checked={includeNumbers}
                  onChange={handleNumbersChange}
                  className="form-checkbox h-5 w-5"
                />
                <p className="text-white">Numbers</p>
              </label>
            </div>
            <div className="mb-4 sm:w-1/4">
              <label htmlFor="symbols" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="symbols"
                  checked={includeSymbols}
                  onChange={handleSymbolsChange}
                  className="form-checkbox h-5 w-5"
                />
                <p className="text-white">Symbols</p>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-buttonBg text-black font-bold py-2 px-4 rounded hover:bg-headerBg hover:text-white transition duration-300 cursor-pointer"
            >
              Generate Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordGenerator;
