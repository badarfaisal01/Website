import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedInId } from '../../services/GetCookieValues';
import { addToWatchHistory } from '../../services/watchHistory/WatchHistory';
import { getTop10MoviesForUserDashboard } from '../../services/user/Dashboard';
import { getActionMovies, getComedyMovies } from '../../services/movies/MoviesManagement';

function UserDashboard() {
    const [movies, setMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await getTop10MoviesForUserDashboard();
                setMovies(fetchedMovies);
                if (fetchedMovies.length > 0) {
                    setFeaturedMovie(fetchedMovies[0]);
                }
                const comedyMovies = await getComedyMovies();
                setComedyMovies(comedyMovies);
                const actionMovies = await getActionMovies();
                setActionMovies(actionMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const watchMovie = async (movieId) => {
        const userId = loggedInId;
        await addToWatchHistory(userId, movieId);
        nav('/watchMovie', { state: { id: movieId } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-violet-900  text-white">
            {/* Hero Section */}
            {featuredMovie && (
                <div
                    onClick={() => watchMovie(featuredMovie._id)}
                    className="relative w-full h-[500px] bg-cover bg-center cursor-pointer group"
                    style={{
                        backgroundImage: featuredMovie.movieCoverPhoto?.data
                            ? `url(${URL.createObjectURL(
                                  new Blob([new Uint8Array(featuredMovie.movieCoverPhoto.data)], {
                                      type: 'image/jpeg',
                                  })
                              )})`
                            : 'none',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                        <h1 className="text-6xl font-extrabold text-violet-200 drop-shadow-xl group-hover:text-violet-300">
                            {featuredMovie.title}
                        </h1>
                        <p className="text-lg text-gray-300 mt-4">{featuredMovie.releaseDate}</p>
                        <button className="mt-6 bg-violet-700 hover:bg-violet-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300">
                            Watch Now
                        </button>
                    </div>
                </div>
            )}

            {/* Movie Sections */}
            <Section title="Top Movies">
                <MovieGrid movies={movies} onWatch={watchMovie} />
            </Section>

            <Section title="Action Movies">
                <MovieGrid movies={actionMovies} onWatch={watchMovie} />
            </Section>

            <Section title="Comedy Movies">
                <MovieGrid movies={comedyMovies} onWatch={watchMovie} />
            </Section>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-6">
            <h2 className="mt-4 text-4xl font-extrabold text-violet-200 mb-6 border-b-2 border-violet-700 pb-2">
                {title}
            </h2>
            {children}
        </div>
    );
}

function MovieGrid({ movies, onWatch }) {
    return movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} onWatch={onWatch} />
            ))}
        </div>
    ) : (
        <p className="text-gray-400 text-center">No movies available</p>
    );
}

function MovieCard({ movie, onWatch }) {
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
            className="relative bg-black rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '300px',
                maxHeight: '300px',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-violet-900 opacity-80 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative z-10 p-4 flex flex-col justify-end h-full">
                <h3 className="text-xl font-bold text-violet-200 drop-shadow-md group-hover:text-violet-300 transition duration-300">
                    {movie.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{movie.releaseDate}</p>
            </div>
        </div>
    );
}

export default UserDashboard;