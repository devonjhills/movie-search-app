import React from 'react'

const MovieCard = ({movie}) => {
    return (
        <span>
            <h2>{movie.title}</h2> 
            <h5>Rating: {movie.vote_average}</h5>
            <img style={{width: "200px"}} src={movie.poster} alt='movie poster' />
            <p style={{width: "500px"}}>
                {movie.overview}
            </p>
        </span>
    )
}

export default MovieCard
