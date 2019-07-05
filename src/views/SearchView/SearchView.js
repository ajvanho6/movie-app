import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './SearchView.scss';
import SearchForm from '../../components/SearchForm/SearchForm';
import {searchMovie, addMovieToFavorites, resetFavorites, fetchMovieTrailer} from '../../actions/movieActions';
import MovieList from '../../components/MovieList/MovieList';
import {
    createAllMoviesSelector,
    createIsSearchingMoviesSelector,
    createFavoritesMoviesSelector,
    createMoviesTrailerSelector,
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
        fetchMovieTrailer: PropTypes.func,
        trailers: PropTypes.array,
    };

    static defaultProps = {
        searchMovie: () => {},
        movies: [],
        isSearchingMovies: false,
        addMovieToFavorites: () => {},
        favoriteMovies: [],
        resetFavorites: () => {},
        fetchMovieTrailer: () => {},
        trailers: () => {},
    };

    state = {
        query: '',
        isFavoritesListShown: false,
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

    checkFavoriteList = () => {
        const {favoriteMovies} = this.props;
        if (favoriteMovies.length > 0) {
            return true;
        }
        return false;
    }

    showFavoriteList = () => {
        this.setState({
            isFavoritesListShown: true,
        });
    }

    hideFavoriteList = () => {
        this.setState({
            isFavoritesListShown: false,
        });
    }

    resetFavorites = () => {
        this.setState({
            query: '',
        });
        this.props.resetFavorites();
        this.hideFavoriteList();
    }

    render() {
        const {
            movies,
            addMovieToFavorites,
            favoriteMovies,
            fetchMovieTrailer,
            trailers,
        } = this.props;

        const {query, isFavoritesListShown} = this.state;

        return (
            <div className="m-app-search-view">
                {!isFavoritesListShown && (
                    <SearchForm
                        query={query}
                        handleSubmit={this.handleSubmit}
                        handleSearchQuery={this.handleSearchQuery}
                    />
                )}
                <div>
                    {(movies.length > 0) && !isFavoritesListShown && (
                    <MovieList
                        movies={movies}
                        fetchMovieTrailer={fetchMovieTrailer}
                        addMovieToFavorites={addMovieToFavorites}
                        isFavoriteListEmpty={this.checkFavoriteList()}
                    />
                    )}

                    {isFavoritesListShown && (
                    <FavoriteList
                        favoriteMovies={favoriteMovies}
                        trailers={trailers}
                        resetFavorites={this.resetFavorites}
                    />
                    )}

                    {(favoriteMovies.length > 0) && !isFavoritesListShown && (
                        <span className="m-app-search-view__favorites" onClick={this.showFavoriteList}>
                            Show Favorites List
                        </span>
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
    const selectMoviesTrailerSelector = createMoviesTrailerSelector();
    return {
        movies: selectAllMovies(state),
        isSearchingMovies: selectIsSearchingMovies(state),
        favoriteMovies: selectFavoritesMovies(state),
        trailers: selectMoviesTrailerSelector(state),
    };
};

const mapDispatchToProps = {
    searchMovie,
    addMovieToFavorites,
    resetFavorites,
    fetchMovieTrailer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView);
