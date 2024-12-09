import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUser, FaFilm, FaClipboardList } from 'react-icons/fa';

function AdminHeader() {
    
    const navigator = useNavigate();
    
    return (
        <header className="bg-gradient-to-b from-black to-violet-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <nav className="flex space-x-4">
                    <Button
                        onClick={() => navigator('/admin/adminDashboard')}
                        icon={<FaTachometerAlt />}
                        label="Dashboard"
                    />
                    <Button
                        onClick={() => navigator('/admin/userManagement')}
                        icon={<FaUsers />}
                        label="User Management"
                    />
                    <Button
                        onClick={() => navigator('/admin/sellerManagement')}
                        icon={<FaUser />}
                        label="Seller Management"
                    />
                    <Button
                        onClick={() => navigator('/admin/seller/approveMovies')}
                        icon={<FaFilm />}
                        label="Movies Management"
                    />
                    <Button
                        onClick={() => navigator('/admin/subscriptionManagement')}
                        icon={<FaClipboardList />}
                        label="Subscription Management"
                    />

                    <button onClick={() => navigator('/logout')}>Logout</button>
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

export default AdminHeader;