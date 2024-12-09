import axios from "axios";

import { authToken, loggedInId } from "../GetCookieValues";

const BACKEND_URL = "http://localhost:3213";

export const getAllMoviesForSeller = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  console.log(loggedInId)
  const moviesRespose = await axios.get(BACKEND_URL + `/movies/getAllForSeller/${loggedInId}`, config);
  console.log(moviesRespose)
  return moviesRespose.data.movies;
};
  export const getMovieById = async (movieId) => {
    console.log("getMovieById", movieId);
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        responseType: 'arraybuffer', // Ensure binary data is returned
    };

    const response = await axios.get(BACKEND_URL + `/movies/${movieId}`, config);

    console.log("Response Data: ", response.data);

    const filename = response.headers['content-disposition']
        ? response.headers['content-disposition'].split('filename=')[1].replace('.mp4', '')
        : 'Untitled Movie';

    const videoBlob = new Blob([response.data], { type: 'video/mp4' });
    const videoURL = URL.createObjectURL(videoBlob);

    console.log("Generated Video URL: ", videoURL);

    return { filename, videoURL };
};

export const uploadMovieForSeller = async (formData) => {
    const config = {
        headers: {
          'Content-Type':'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      };

      const movieRespose = await axios.post(BACKEND_URL + `/movies/upload`,formData, config);
   console.log(movieRespose)
}

export const getAllMoviesForAdmin = async() => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };


  const movieRespose = await axios.get(BACKEND_URL + `/movies/getAll`);
  // Loop till movies response
  // Set cover photo for every movie
  // From Cloudinary
  console.log(movieRespose.data.movies)
  return movieRespose.data.movies;
}

export const uploadCoverPhoto = async (id,formData) => {
    const config = {
        headers: {
          'Content-Type':'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      };

      console.log("Form Data: ", formData);

      const movieRespose = await axios.post(BACKEND_URL + `/movies/${id}/upload-cover`,formData, config);
   console.log("HELLLELSAE", movieRespose)
}

export const deleteMovie = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        
      },
      responseType: 'arraybuffer'
    };

    console.log(id);
  
    try {
      const response = await axios.delete(`${BACKEND_URL}/movies/${id}`, config);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data || 'Error Deleting movie');
    }
  };


  export const updateMovie = async (id, movieData) => {
    console.log(movieData)
    console.log(id)
    const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

    const response = await axios.put(`${BACKEND_URL}/movies/${id}`, movieData, config);
    return response.data;
};

export const searchMovieByTitle = async (movieName) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  
  console.log(movieName)
  const response = await axios.get(`${BACKEND_URL}/movie/getByName/${movieName}`, config);
  // console.log(response.data);
  return response.data;
};

export const getSimilarGenreMovies = async (movieId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  
  console.log(movieId)
  const response = await axios.get(`${BACKEND_URL}/movies/similar/${movieId}`, config);
  console.log(response.data);
  return response.data;
};

export const getActionMovies = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  
  const response = await axios.get(`${BACKEND_URL}/movies/getAllAction`, config);
  console.log(response.data);
  return response.data;
};

export const getComedyMovies = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  
  const response = await axios.get(`${BACKEND_URL}/movies/getAllComedy`, config);
  console.log(response.data);
  return response.data;
};

  