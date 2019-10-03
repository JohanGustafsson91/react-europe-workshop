import React from 'react';
import styled from 'styled-components';

const Movie = movie => {
  return (
    <Card
      key={movie.id}
      style={{
        height: 200,
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : null,
      }}>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle>
          {movie.vote_average} ({movie.vote_count} votes)
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

Movie.propTypes = {};

export default Movie;

const Card = styled.div`
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex: 1;
  margin-bottom: 15px;
  background-color: #eee;
`;

Card.Body = styled.div`
  padding: 5px;
`;

Card.Title = styled.div`
  color: #fff;
  text-shadow: 2px 1px #000;
  font-weight: bold;
`;

Card.Subtitle = styled.div`
  color: #fff;
  text-shadow: 1px 1px #000;
`;
