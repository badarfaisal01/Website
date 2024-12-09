import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaFilm,FaUser, FaSearch, FaUserCog } from 'react-icons/fa';

function SellerHeader() {
    const navigator = useNavigate();

    return (
      <header className="bg-gradient-to-b from-black to-violet-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <nav className="flex space-x-4">
                    <Button
                        onClick={() => navigator('/seller/dashboard')}
                        icon={<FaTachometerAlt />}
                        label="Dashboard"
                    />
                    <Button
                        onClick={() => navigator('/seller/movieManagement')}
                        icon={<FaFilm />}
                        label="Movie Management"
                    />
                    <Button
                        onClick={() => navigator('/seller/browseMovies')}
                        icon={<FaSearch />}
                        label="Browse Movies"
                    />
                    <Button
                        onClick={() => navigator('/seller/accountManagement')}
                        icon={<FaUser Cog />}
                        label="Account Management"
                    />
                    <button
                        onClick={() => navigator('/logout')}
                        //className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-200"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}

function Button({ onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-700 to-violet-600 hover:from-violet-600 hover:to-violet-500 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
            <span className="mr-2">{icon}</span>
            {label}
        </button>
    );
}

export default SellerHeader;