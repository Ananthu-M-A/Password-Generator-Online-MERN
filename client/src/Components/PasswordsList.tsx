import axios from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CriteriaType, PasswordType } from '../types/Types';
import { useAppContext } from '../contexts/AuthContext';

function PasswordsList() {
    const [passwords, setPasswords] = useState<PasswordType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [passwordIndex, setPasswordIndex] = useState(-1);
    const { showToast, isLoggedIn } = useAppContext();
    const backendURL = import.meta.env.VITE_API_BACKEND_URL;

    const loadPasswords = useCallback(async (page: number) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user/saved-passwords`, {
                params: { page, limit: 10 },
                withCredentials: true,
            });
            setPasswords(data.passwords);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error loading passwords:', error);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        loadPasswords(currentPage);
    }, [isLoggedIn, currentPage, loadPasswords]);

    const criteriaList = useCallback((criteria: CriteriaType) => {
        const { passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = criteria;
        return (
            <div className='flex flex-wrap gap-2 justify-center'>
                {includeUppercase && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Uppercase</p>}
                {includeLowercase && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Lowercase</p>}
                {includeNumbers && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Numbers</p>}
                {includeSymbols && <p className='bg-black text-white text-sm p-1 font-semibold rounded'>Symbols</p>}
                <div className='flex gap-1 bg-black text-white text-sm p-1 font-semibold rounded'>
                    Password Length
                    <p className='bg-blue-600 rounded px-1'>{passwordLength}</p>
                </div>
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
                    <td className="border px-2 sm:px-4 py-2">
                        <p onClick={() => deletePassword(index)}
                            className='font-bold border cursor-pointer'>X</p>
                    </td>
                </tr>
            );
        });
    }, [passwords, criteriaList]);

    const copyPassword = async (index: number) => {
        navigator.clipboard.writeText(passwords[index].password).then(() => {
            showToast({ message: "Password copied to clipboard!", type: "SUCCESS" });
        }).catch(err => {
            showToast({ message: "Could not copy text!", type: "ERROR" });
            console.error('Could not copy password', err);
        });
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    const deletePassword = (index: number) => {
        setPasswordIndex(index);
        setShowModal(true);
    }

    const confirmDeletePassword = async () => {
        try {
            if (passwordIndex !== -1) {              
                const { data } = await axios.put(`${backendURL}/api/user/saved-passwords`, {
                    password: passwords[passwordIndex].password
                }, { withCredentials: true });
                if(data.status === "Success"){
                    setShowModal(false);
                    window.location.reload();
                    showToast({ message: "Password deleted successfully!", type: "SUCCESS" });
                }
            }
        } catch (error) {
            console.error('Error deleting password:', error);
            showToast({ message: "Error deleting password!", type: "ERROR" });
        } finally {
            setShowModal(false);
            setPasswordIndex(-1);
        }
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
                                <th className="border px-2 sm:px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-center mt-4'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <p className='px-2 py-1 mx-1'>{currentPage} of {totalPages}</p>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-buttonBg bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-xl font-semibold mb-4">Are you sure you want to delete this password??</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-buttonBg rounded-md mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeletePassword}
                                className="px-4 py-2 bg-buttonBg2 text-white rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default PasswordsList;
