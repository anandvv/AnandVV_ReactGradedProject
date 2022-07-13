import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from "styled-components";

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
  height: 362px;
`;

type Movie = {
    id: string,
    title: string,
    poster: string,
    storyLine: string
}

const Favorites = (props: any) => {
  let BASE_URL = './img/';
  return (
    <MovieListContainer>
        {
            props.movies.map((movie: Movie, index: string) => (
                <Card style={{ width: '18rem' }} key={ index }>
                    <CoverImage src={`${BASE_URL}${movie.poster}`} alt={movie.title} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>
                        {movie.storyLine}
                        </Card.Text>
                        <Button variant="primary">Favorite</Button>
                    </Card.Body>
                </Card>        
            ))
        }
    </MovieListContainer>
  );
}

export default Favorites;