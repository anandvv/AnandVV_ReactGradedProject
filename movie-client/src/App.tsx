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
      case "/movies-coming":
        // apiEndPoint = `${baseAPIUrl}/movies-coming`;
        apiEndPoint = `/movies-coming`;
        // apiEndPoint = `${window.location.href}`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/in-theaters":
        // apiEndPoint = `${baseAPIUrl}/movies-in-theaters`;
        apiEndPoint = `/movies-in-theaters`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/top-rated-india":
        // apiEndPoint = `${baseAPIUrl}/top-rated-india`;
        apiEndPoint = `/top-rated-india`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/top-rated-movies":
        // apiEndPoint = `${baseAPIUrl}/top-rated-movies`;
        apiEndPoint = `/top-rated-movies`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/favorites":
        // apiEndPoint = `${baseAPIUrl}/favourit`;
        apiEndPoint = `/favourit`;
        setShowFavoriteButtons(false);
        setCurrentApi(apiEndPoint);
        break;
      default: 
        // apiEndPoint = `${baseAPIUrl}/movies-coming`;
        apiEndPoint = `/movies-coming`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
    }

		const response = await fetch(`${baseAPIUrl}${apiEndPoint}`);
		const responseJson = await response.json();
    console.log(responseJson);
    

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
  
  // return (
  //   <>
  //       <NavigationBar />
  //       {/* <Routes>
  //         <Route path="/:category/:id" element={<MovieDetails />} />
  //         <Route path="/in-theaters" element={<MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} />} />
  //         <Route path="/coming-soon" element={<MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} />} />
  //         <Route path="/top-rated-india" element={<MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} />} />
  //         <Route path="/top-rated-movies" element={<MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} />} />
  //         <Route path="/favourit" element={<MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} />} />
  //         <Route path="/" element={<MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} />} />
  //       </Routes> */}
  //       {/* <MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} countID={countID}/> */}
    
  //   </>
  // );
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
