import React from 'react';
import PropTypes from 'prop-types';

import './MovieList.scss';
import MovieListItem from '../MovieListItem/MovieListItem';

const MovieList = ({
    movies,
    watchLaterMovies,
    favoriteMovies,
    addMovieToFavorites,
    addMovieToWatchLaterList,
    fetchMovieTrailer,
}) => {
    const addFavorites = favoriteMovie => {
        getMovieTrailer(favoriteMovie.id);
        return addMovieToFavorites({
            favoriteMovie,
        });
    };

    const addToWatchList = watchListMovie => {
        return addMovieToWatchLaterList({
            watchListMovie,
        });
    };

    const getMovieTrailer = movieID => {
        return fetchMovieTrailer({movieID});
    };

    const isItemInFavoriteList = id => {
        return favoriteMovies.some(favoriteMovie => {
            return favoriteMovie.id === id;
        });
    };

    const isItemInWatchLaterList = id => {
        return watchLaterMovies.some(watchLaterMovie => {
            return watchLaterMovie.id === id;
        });
    };

    return (
        <ul className="m-app-movie-list">
            {
                movies.map(movie => {
                    return (
                        <MovieListItem
                            key={movie.id || null}
                            movie={movie}
                            addFavorites={addFavorites}
                            addToWatchList={addToWatchList}
                            isItemInFavoriteList={isItemInFavoriteList(movie.id)}
                            isItemInWatchLaterList={isItemInWatchLaterList(movie.id)}
                        />
                    );
                })
            }
        </ul>
    );
};

MovieList.propTypes = {
    movies: PropTypes.array,
    addMovieToFavorites: PropTypes.func,
    fetchMovieTrailer: PropTypes.func,
    addMovieToWatchLaterList: PropTypes.func,
    favoriteMovies: PropTypes.array,
    watchLaterMovies: PropTypes.array,
};

MovieList.defaultProps = {
    movies: [],
    addMovieToFavorites: () => {},
    fetchMovieTrailer: () => {},
    addMovieToWatchLaterList: () => {},
    favoriteMovies: [],
    watchLaterMovies: [],
};

export default MovieList;
