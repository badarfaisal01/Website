import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserHeader() {
    const navigator = useNavigate();
    
    return (
        <header className="bg-gradient-to-b from-black to-violet-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
               
                <nav className="space-x-4">
                <button
                        onClick={() => navigator('/userDashboard')}
                        className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                    >
                        DashBoard
                    </button>
                    <button
                        onClick={() => navigator('/user/history')}
                        className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                    >
                        History
                    </button>

                    <button
                        onClick={() => navigator('/user/search')}
                        className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
                    >
                        Search
                    </button>

                    <button
                        onClick={() => navigator('/user/plans')} // Navigate to PlanSelection
                        className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
                    >
                        Plans
                    </button>

                    <button
                        onClick={() => navigator('/logout')}
                       // className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                    >
                        Logout
                    </button>


                </nav>
            </div>
        </header>
    );
}

export default UserHeader;