import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import MovieList from './components/MovieList';
import Favorites from './components/Favorites';
import { 
  RouteComponentProps,
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink } from 'react-router-dom';

type Props = {};

function App(props: Props) {
  const [movies, setMovies] = useState([]);
  const [currentApi, setCurrentApi] = useState("");
  const [baseUrl] = useState("http://localhost:3002");
  const [showFavoriteButtons, setShowFavoriteButtons] = useState(true);
  const [countID, setCountID] = useState(0);

  console.log('current URL 👉️', window.location.href);
  console.log('current Pathname 👉️', window.location.pathname);

  const getMovieRequest = async () => {
    let apiEndPoint = "";
    
    switch(window.location.pathname){
      case "/coming-soon":
        apiEndPoint = `${baseUrl}/movies-coming`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/in-theaters":
        apiEndPoint = `${baseUrl}/movies-in-theaters`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/top-rated-india":
        apiEndPoint = `${baseUrl}/top-rated-india`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/top-rated-movies":
        apiEndPoint = `${baseUrl}/top-rated-movies`;
        setShowFavoriteButtons(true);
        setCurrentApi(apiEndPoint);
        break;
      case "/favorites":
        apiEndPoint = `${baseUrl}/favourit`;
        setShowFavoriteButtons(false);
        setCurrentApi(apiEndPoint);
        break;
      default: 
        apiEndPoint = `${baseUrl}/movies-coming`;
        setShowFavoriteButtons(true);
        break;
    }

    const url = apiEndPoint;

		const response = await fetch(url);
		const responseJson = await response.json();
    console.log(responseJson);
    

		if (responseJson.length > 0) {
			setMovies(responseJson);
		}
	};

	useEffect(() => {
		getMovieRequest();
	}, []);

  return (
    <>
        <NavigationBar />
        <MovieList movies={movies} currentApi={currentApi} baseUrl={baseUrl} showFavoriteButtons={showFavoriteButtons} countID={countID}/>
    
    </>
  );
}

export default App;
