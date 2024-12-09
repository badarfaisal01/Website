import React, { useEffect, useState } from 'react';
import { getSellerDashboard } from '../../services/seller/SellerManagement';
import { useNavigate } from 'react-router-dom';

function SellerDashboard() {
    const [dashboardData, setDashboardData] = useState({
        totalMovies: 0,
        approvedMovies: 0,
        notApprovedMovies: 0,
        totalEarning: 0,
        movies: [] // Initialize movies as an empty array
    });

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const nav = useNavigate();

    useEffect(() => {
        const getSellerDashboardForS = async () => {
            const rsp = await getSellerDashboard();
            setDashboardData(rsp);
        };

        getSellerDashboardForS();
    }, []);

    const watchMovie = async (movieId) => {
        nav('/watchMovie', { state: { id: movieId } });
    };

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <nav className="bg-transparent p-4 flex items-center justify-between shadow-lg">
                <h1 className="text-3xl font-bold text-purple-400">Seller Dashboard</h1>
                <ul className="hidden md:flex space-x-6 text-white">
                    <li className="hover:text-purple-300 cursor-pointer" onClick={() => nav('/')}>Home</li>
                    <li className="hover:text-purple-300 cursor-pointer" onClick={() => nav('/movies')}>Movies</li>
                    <li className="hover:text-purple-300 cursor-pointer" onClick={() => nav('/stats')}>Stats</li>
                </ul>

                {/* Profile Section */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center space-x-2 bg-black bg-opacity-70 p-2 rounded-lg hover:bg-purple-700"
                    >
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="text-purple-300">Profile</span>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-80 rounded-lg shadow-lg z-10 border border-purple-700">
                            <ul className="text-white">
                                <li
                                    className="px-4 py-2 hover:bg-purple-600 cursor-pointer"
                                    onClick={() => nav('/profile')}
                                >
                                    View Profile
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-purple-600 cursor-pointer"
                                    onClick={() => nav('/settings')}
                                >
                                    Settings
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-purple-600 cursor-pointer"
                                    onClick={() => nav('/logout')}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Movies" value={dashboardData.totalMovies} />
                    <StatCard title="Approved Movies" value={dashboardData.approvedMovies} />
                    <StatCard title="Not Approved Movies" value={dashboardData.notApprovedMovies} />
                </div>

                {/* Movies Grid */}
                <h2 className="text-2xl font-bold mb-6 text-purple-300">Movies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dashboardData.movies && dashboardData.movies.length > 0 ? (
                        dashboardData.movies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} onWatch={watchMovie} />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">No movies available.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="p-4 bg-black bg-opacity-70 shadow-md rounded-lg text-center border border-purple-500">
            <h2 className="text-xl font-semibold text-purple-300">{title}</h2>
            <p className="text-3xl text-white">{value}</p>
        </div>
    );
}

export function MovieCard({ movie, onWatch }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (movie.movieCoverPhoto && movie.movieCoverPhoto.data) {
            const blob = new Blob([new Uint8Array(movie.movieCoverPhoto.data)], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setImageUrl(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [movie.movieCoverPhoto]);

    return (
        <div
            onClick={() => onWatch(movie._id)}
            className="relative bg-black bg-opacity-60 rounded-lg shadow-lg overflow-hidden min-h-[300px] max-h-[300px] transition duration-300 transform hover:scale-105 cursor-pointer"
            style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-purple-900 bg-opacity-40 transition-opacity duration-300"></div>
            <div className="relative z-10 p-4 flex flex-col justify-end h-full">
                <h2 className="text-lg font-bold text-purple-300">{movie.title}</h2>
                <p className="text-sm text-gray-300">Views: {movie.views}</p>
                <p className="text-sm text-gray-300">Earnings: ${(movie.views / 10).toFixed(2)}</p>
            </div>
        </div>
    );
}

export default SellerDashboard;
