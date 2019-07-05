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
import {generateSearchMovieByQueryUrl} from '../../api/movieApi';

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
        value: '',
        isFavoritesListShown: false,
        suggestions: [],
    };

    createPayload = () => {
        const {value} = this.state;
        return {
            query: value,
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
            value: '',
        });
        this.props.resetFavorites();
        this.hideFavoriteList();
    }

    handleAutoSuggestChange = (event, {newValue}) => {
        this.setState({value: newValue});
    }

    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []});
    };

    onSuggestionsFetchRequested = ({value}) => {
        fetch(`https://api.themoviedb.org/3${generateSearchMovieByQueryUrl(value)}`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }})
            .then(response => response.json())
            .then(data => this.setState({suggestions: data.results}));
    }

    render() {
        const {
            movies,
            addMovieToFavorites,
            favoriteMovies,
            fetchMovieTrailer,
            trailers,
        } = this.props;

        const {
            isFavoritesListShown,
            suggestions,
            value,
        } = this.state;

        return (
            <div className="m-app-search-view">
                {!isFavoritesListShown && (
                    <SearchForm
                        handleSubmit={this.handleSubmit}
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        handleAutoSuggestChange={this.handleAutoSuggestChange}
                        onSuggestionSelected={this.handleSubmit}
                        value={value}
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
