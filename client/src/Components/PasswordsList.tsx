function PasswordsList() {
    return (
        <div className="bg-img h-screen bg-cover bg-center flex justify-center items-center">
            <div className="w-full m-10 flex flex-col border bg-white p-4">
                <table className="w-full border">
                    <thead className="border-b">
                        <tr>
                            <th className="border px-4 py-2">Sl No</th>
                            <th className="border px-4 py-2">Passwords</th>
                            <th className="border px-4 py-2">Criteria</th>
                            <th className="border px-4 py-2">Created On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">qwertyuiobnm,</td>
                            <td className="border px-4 py-2"> m</td>
                            <td className="border px-4 py-2">DZFGHFDS</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PasswordsList
