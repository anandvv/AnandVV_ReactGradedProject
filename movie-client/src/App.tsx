import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import MovieList from './components/MovieList';
import Favorites from './components/Favorites';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import MovieDetails from './components/MovieDetails';

const InnerApp = () => {
  const [movies, setMovies] = useState([]);
  const [currentApi, setCurrentApi] = useState("");
  const [baseAPIUrl] = useState("http://localhost:3002");
  const [showFavoriteButtons, setShowFavoriteButtons] = useState(true);

  console.log('current URL 👉️', window.location.href);
  console.log('current Pathname 👉️', window.location.pathname);

  const getMovieRequest = async () => {
    let apiEndPoint = "";
    
    switch(window.location.pathname){
      case "/in-theaters":
        apiEndPoint = `/movies-in-theaters`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/top-rated-india":
        apiEndPoint = `/top-rated-india`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/top-rated-movies":
        apiEndPoint = `/top-rated-movies`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/favorites":
        apiEndPoint = `/favourit`;
        setShowFavoriteButtons(false);
        setCurrentApi(apiEndPoint);
        break;
      case "/movies-coming":
      default: 
        apiEndPoint = `/movies-coming`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
    }

    async function GetMovies() {
      const response = await fetch(`${baseAPIUrl}${apiEndPoint}`);
      return response.json();
    }

		const responseJson = await GetMovies();
    
		if (responseJson.length > 0) {
			setMovies(responseJson);
		}

	};

	useEffect(() => {
		getMovieRequest();
	}, []);

  return useRoutes([

    {path: "/:category/:id", element: <MovieDetails /> },
    {path:"/movies-coming", element: <MovieList movies={movies} currentApi={currentApi} baseUrl={baseAPIUrl} showFavoriteButtons={showFavoriteButtons} />},
    {path:"/in-theaters", element: <MovieList movies={movies} currentApi={currentApi} baseUrl={baseAPIUrl} showFavoriteButtons={showFavoriteButtons} />},
    {path:"/top-rated-india", element: <MovieList movies={movies} currentApi={currentApi} baseUrl={baseAPIUrl} showFavoriteButtons={showFavoriteButtons} />},
    {path:"/top-rated-movies", element: <MovieList movies={movies} currentApi={currentApi} baseUrl={baseAPIUrl} showFavoriteButtons={showFavoriteButtons} />},
    {path:"/favorites", element: <MovieList movies={movies} currentApi={currentApi} baseUrl={baseAPIUrl} showFavoriteButtons={showFavoriteButtons} />},
    {path:"/", element: <MovieList movies={movies} currentApi={currentApi} baseUrl={baseAPIUrl} showFavoriteButtons={showFavoriteButtons} />}

  ]);
  
}

const App = () => {
  return (
    <>
      <NavigationBar />
      <Router>
        <InnerApp />
      </Router>
    </>
  );
};

export default App;
