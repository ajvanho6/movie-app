import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './SearchView.scss';
import SearchForm from '../../components/SearchForm/SearchForm';
import {searchMovie, addMovieToFavorites, resetFavorites} from '../../actions/movieActions';
import MovieList from '../../components/MovieList/MovieList';
import {
    createAllMoviesSelector,
    createIsSearchingMoviesSelector,
    createFavoritesMoviesSelector,
} from '../../selectors/movieSelectors';
import FavoriteList from '../../components/FavoriteList/FavoriteList';


class SearchView extends Component {
    static propTypes = {
        searchMovie: PropTypes.func,
        movies: PropTypes.array,
        isSearchingMovies: PropTypes.bool,
        addMovieToFavorites: PropTypes.func,
        favoriteMovies: PropTypes.array,
        resetFavorites: PropTypes.func,
    };

    static defaultProps = {
        searchMovie: () => {},
        movies: [],
        isSearchingMovies: false,
        addMovieToFavorites: () => {},
        favoriteMovies: [],
        resetFavorites: () => {},
    };

    state = {
        query: '',
    };

    handleSearchQuery = e => {
        this.setState({
            query: e.target.value,
        });
    }

    createPayload = () => {
        const {query} = this.state;
        return {
            query,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.searchMovie(this.createPayload());
    }

    render() {
        const {movies, addMovieToFavorites, favoriteMovies, resetFavorites} = this.props;
        const {query} = this.state;

        return (
            <div className="m-app-search-view">
                <SearchForm
                    query={query}
                    handleSubmit={this.handleSubmit}
                    handleSearchQuery={this.handleSearchQuery}
                />
                <div>
                    {movies.length > 0 && (
                    <MovieList
                        movies={movies}
                        addMovieToFavorites={addMovieToFavorites}
                    />
                    )}

                    {favoriteMovies.length > 0 && (
                    <FavoriteList
                        favoriteMovies={favoriteMovies}
                        resetFavorites={resetFavorites}
                    />
                    )}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    const selectAllMovies = createAllMoviesSelector();
    const selectIsSearchingMovies = createIsSearchingMoviesSelector();
    const selectFavoritesMovies = createFavoritesMoviesSelector();
    return {
        movies: selectAllMovies(state),
        isSearchingMovies: selectIsSearchingMovies(state),
        favoriteMovies: selectFavoritesMovies(state),
    };
};

const mapDispatchToProps = {
    searchMovie,
    addMovieToFavorites,
    resetFavorites,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView);
