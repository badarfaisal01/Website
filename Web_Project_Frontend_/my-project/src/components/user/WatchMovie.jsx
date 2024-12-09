import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { getMovieById } from '../../services/movies/MoviesManagement';

function WatchMovie() {
    const location = useLocation();
    const id = location.state?.id; 

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            if (!id) {
                console.error("No movie ID found in location state.");
                return;
            }

            console.log("Fetching movie with ID:", id);
            try {
                const movieData = await getMovieById(id);
                setMovie(movieData.videoURL);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    return (
        <div>
            
            {movie ? (
                <video controls style={{ width: '100%' }}>
                    <source src={movie} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
}

export default WatchMovie;
