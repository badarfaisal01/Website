import axios from "axios"
import { authToken } from "../GetCookieValues";

const BACKEND_URL = "http://localhost:3213";

export const getTop10MoviesForUserDashboard = async () => {

    const config = {
        headers: {
          Authorization: `Bearer ${authToken}` 
        }
      };
  
    try{
        const moviesReponse = await axios.get(BACKEND_URL+"/movies", config);
        console.log()
        return moviesReponse.data.movies;
    }
    catch(e)
    {

    }
}