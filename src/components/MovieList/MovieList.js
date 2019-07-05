import React, {Component} from 'react';
import PropTypes from 'prop-types';


import './MovieList.scss';
import MovieListItem from '../MovieListItem/MovieListItem';

class MovieList extends Component {
    static propTypes = {
        movies: PropTypes.array,
        addMovieToFavorites: PropTypes.func,
    };

   static defaultProps = {
       movies: [],
       addMovieToFavorites: () => {},
   };

    state = {}

    addFavorites = favoriteMovie => {
        this.props.addMovieToFavorites({
            favoriteMovie,
        });
    }

    render() {
        const {movies} = this.props;
        const {isFavorite} = this.state;

        return (
            <ul className="m-app-movie-list">
                {
                    movies.map(movie => {
                        return (
                            <MovieListItem
                                key={movie.id || null}
                                movie={movie}
                                isFavorite={isFavorite}
                                addFavorites={this.addFavorites}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

export default MovieList;
