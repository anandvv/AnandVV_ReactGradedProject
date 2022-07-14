import axios from "axios";
import IMovie from "../models/IMovie";

const baseUrl = "http://localhost:3002";

// const getMovies = (category: string) => {
//   return axios.get<IMovie[]>(`${baseUrl}/${category}`)
//     .then(response => response.data)
// };

const getMoviesById = async (category: string, id: string | number) => {
    
    let movieDetailsUrl = "";
    let responseJson = "";

    let isIdBasedUrl = false;
    switch(category){
        case "movies-coming":
            isIdBasedUrl = true;
            break;
        case "in-theaters":
            isIdBasedUrl = true;
            break;
        case "top-rated-india":
            isIdBasedUrl = false;
            break;
        case "top-rated-movies":
            isIdBasedUrl = false;
            break;
        default: 
            isIdBasedUrl = true;
            break;
    }
    
    //if id is a number
    if(isIdBasedUrl){
        movieDetailsUrl = `${baseUrl}/${category}/${id}`;
        return axios.get<IMovie>(movieDetailsUrl)
        .then(response => response.data);
    }else {
        movieDetailsUrl = `${baseUrl}/${category}/?title=${id}`;
        return axios.get<IMovie[]>(movieDetailsUrl)
        .then(response => response.data[0]);

    }
};

const checkMovie = (title: string) => {
  return axios.get<IMovie>(`${baseUrl}/favourite/?title=${title}`)
    .then(response => response.data)
};

// const addMovieToFavourite = async (movie: Omit<IMovie, 'id'>) => {
//   const response = await axios.post<IMovie>(
//     `${baseUrl}/favourite`,
//     movie,
//     {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   return response.data;
// };

// const removeMovieFromFavourite = async (id: number | string) => {
//   const response = await axios.delete(`${baseUrl}/favourite/${id}`);
//   return response.data;
// };

export {
//   getMovies,
  getMoviesById,
  checkMovie
//   addMovieToFavourite,
//   removeMovieFromFavourite
};