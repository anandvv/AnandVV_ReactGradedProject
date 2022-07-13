import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';


const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 300px;
  width: auto;
  align: center;
  margin-left: auto;
  margin-right: auto;
`;

type Movie = {
    id: string,
    title: string,
    poster: string,
    storyLine: string
}

const MovieList = (props: any) => {
    const [favoriteID, setFavoriteID] = useState('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
    let favMovies: any[] = props.movies;
    const [movies, setMovies] = useState(favMovies);

    const movieRef = useRef(null);
    let BASE_URL = './img/';

    const getMovieRequest = async (url: string) => {
        const response = await fetch(url);
        return response.json();
    };

    const addFavoriteHandler = async (e: MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        if (target) {
                        
            //base url of the app
            let baseUrl = `${props.baseUrl}`;

            //current url for the movie clicked
            let url = `${props.currentApi}/?title=${target.value}`;

            let movie = await getMovieRequest(url);
            console.log(movie[0]);

            //if the movies is already in favorites, do nothing
            let favoriteMovies = await getMovieRequest(baseUrl + "/favourit");
            console.log("Favorite Movies: " + favoriteMovies);

            let flag = false;

            favoriteMovies.forEach((item: any) => {
                console.log("Movie[0].title" + movie[0].title);
                console.log("item.title" + item.title);
                if(movie[0].title === item.title){
                    flag = true;
                }
            });

            if(flag) return;

            
            //write the movie object into the database favorites
            try{ 
                if (movie[0].title !== "") {
                    setFavoriteID(uuidv4());
                    if(movie[0].id === undefined) movie[0].id = favoriteID;

                    console.log(baseUrl + "/favourit");
                    await axios.post(baseUrl + "/favourit", movie[0])
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })    
                }
        
            }catch(err: any){
                console.log(err);            
            }
    
        }
    }

    const removeFavoriteHandler = async (e: MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        if (target) {
            //get the movie object corresponding to the id from the current URL
            
            //base url of the app
            let baseUrl = `${props.baseUrl}`;

            //current url for the movie clicked
            let url = `${props.currentApi}/?title=${target.value}`;

            let movie = await getMovieRequest(url);
            
            console.log(movie[0]);
            
            //write the movie object into the database favorites
            try{ 
                if (movie[0].title !== "") {
                    console.log(baseUrl + "/favourit");
                    await fetch(baseUrl + "/favourit/" + movie[0].id, {method: 'DELETE'})
                    .then(res => {
                        console.log(res);
                    })    
                }

                let updatedMovies = props.movies;
                const index = updatedMovies.findIndex((item: { title: any; }) => item.title === movie[0].title);
                if(index > -1){
                    console.log("index: " + index);
                    setMovies(updatedMovies.splice(index, 1));
                }                
        
            }catch(err: any){
                console.log(err);            
            }
    
        }
    }

    useEffect(()=>{
        console.log("Re-rendering!")
    }, [movies]);

    return (
        <MovieListContainer>
            {
                props.movies.map((movie: Movie, index: string) => (
                    <Card style={{ width: '16rem' }} key={ index } ref={ movieRef }>
                        <CoverImage src={`${BASE_URL}${movie.poster}`} alt={movie.title} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>
                            {movie.storyLine}
                            </Card.Text>
                            {
                                props.showFavoriteButtons 
                                ?   <Button variant="primary" value={movie.title} onClick={addFavoriteHandler}>Favorite</Button>
                                :   <Button variant="danger" value={movie.title} onClick={removeFavoriteHandler}>Remove</Button>
                            }
                        </Card.Body>
                    </Card>        
                ))
            }
        </MovieListContainer>
    );
}

export default MovieList;