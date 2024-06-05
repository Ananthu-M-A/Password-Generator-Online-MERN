import axios from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CriteriaType, PasswordType } from '../types/Types';
import { useAppContext } from '../contexts/AuthContext';

function PasswordsList() {
    const [passwords, setPasswords] = useState<PasswordType[]>([]);
    const { showToast, isLoggedIn } = useAppContext();

    const loadPasswords = useCallback(async () => {
        try {
            const backendURL = import.meta.env.VITE_API_BACKEND_URL;
            const { data } = await axios.get(`${backendURL}/api/user/saved-passwords`, {
                withCredentials: true,
            });
            setPasswords(data.passwords);
        } catch (error) {
            console.error('Error loading passwords:', error);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        loadPasswords();
    }, [isLoggedIn]);

    const criteriaList = useCallback((criteria: CriteriaType) => {
        const { passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = criteria;
        return (
            <div className='flex flex-wrap gap-2 justify-center'>
                <div className='flex gap-1 bg-black text-white text-sm p-1 font-semibold rounded'>
                    Password Length
                    <p className='bg-blue-600 rounded px-1'>
                        {passwordLength}
                    </p>
                </div>
                {includeUppercase && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Uppercase</p>}
                {includeLowercase && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Lowercase</p>}
                {includeNumbers && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Numbers</p>}
                {includeSymbols && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Symbols</p>}
            </div>
        );
    }, []);

    const tableRows = useMemo(() => {
        return passwords.map((pswd, index) => {
            const { criteria, password, createdAt } = pswd;
            return (
                <tr key={index} className="border-b text-center">
                    <td className="border px-2 sm:px-4 py-2">{index + 1}</td>
                    <td onClick={() => copyPassword(index)}
                        className="border px-2 sm:px-4 py-2 break-words font-semibold hover:cursor-pointer hover:bg-gray-100">{password}</td>
                    <td className="border px-2 sm:px-4 py-2">{criteriaList(criteria)}</td>
                    <td className="border px-2 sm:px-4 py-2">{new Date(createdAt).toLocaleDateString()}</td>
                </tr>
            );
        });
    }, [passwords, criteriaList]);

    const copyPassword = async (index: number) => {
        navigator.clipboard.writeText(passwords[index].password).then(() => {
            showToast({ message: "Password copied to clipboard!", type: "SUCCESS" })
        }).catch(err => {
            showToast({ message: "Could not copy text!", type: "ERROR" })
            console.error('Could not copy password', err);
        });
    }

    return (
        <div className="bg-img h-screen bg-cover bg-center flex justify-center items-center p-4">
            <div className="h-screen w-full lg:w-3/4 xl:w-2/3 flex flex-col border bg-white p-4 rounded-lg shadow-lg">
                <div className="max-h-full overflow-y-auto">
                    <table className="w-full border mt-0 table-auto">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th className="border px-2 sm:px-4 py-2">Sl No</th>
                                <th className="border px-2 sm:px-4 py-2">Passwords</th>
                                <th className="border px-2 sm:px-4 py-2">Criterias</th>
                                <th className="border px-2 sm:px-4 py-2">Created On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
                {passwords.length === 10 &&
                    <div className='flex justify-center mt-4'>
                        <p className='px-2 py-2 text-center font-semibold'>1  2  3  4</p>
                    </div>}
            </div>
        </div>
    );
}

export default PasswordsList;
