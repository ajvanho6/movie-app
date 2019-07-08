import React, {Component} from 'react';
import PropTypes from 'prop-types';


import './MovieList.scss';
import MovieListItem from '../MovieListItem/MovieListItem';

class MovieList extends Component {
    static propTypes = {
        movies: PropTypes.array,
        isFavoriteListEmpty: PropTypes.bool,
        addMovieToFavorites: PropTypes.func,
        fetchMovieTrailer: PropTypes.func,
        addMovieToWatchLaterList: PropTypes.func,
        favoriteMovies: PropTypes.array,
    };

   static defaultProps = {
       movies: [],
       isFavoriteListEmpty: false,
       addMovieToFavorites: () => {},
       fetchMovieTrailer: () => {},
       addMovieToWatchLaterList: () => {},
       favoriteMovies: [],
   };

    state = {}

    addFavorites = favoriteMovie => {
        this.props.addMovieToFavorites({
            favoriteMovie,
        });

        this.fetchMovieTrailer(favoriteMovie.id);
    }

    addToWatchList = watchListMovie => {
        this.props.addMovieToWatchLaterList({
            watchListMovie,
        });
    }

    fetchMovieTrailer = movieID => {
        this.props.fetchMovieTrailer({movieID});
    }

    isItemInFavoriteList = id => {
        const {favoriteMovies} = this.props;

        return favoriteMovies.some(favoriteMovie => {
            return favoriteMovie.id === id;
        });
    }

    render() {
        const {movies, isFavoriteListEmpty} = this.props;

        return (
            <ul className="m-app-movie-list">
                {
                    movies.map(movie => {
                        return (
                            <MovieListItem
                                key={movie.id || null}
                                movie={movie}
                                addFavorites={this.addFavorites}
                                addToWatchList={this.addToWatchList}
                                isFavoriteListEmpty={isFavoriteListEmpty}
                                isItemInFavoriteList={this.isItemInFavoriteList(movie.id)}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

export default MovieList;
