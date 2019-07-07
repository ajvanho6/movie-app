import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './SearchView.scss';
import SearchForm from '../../components/SearchForm/SearchForm';
import {
    searchMovie,
    addMovieToFavorites,
    resetFavorites,
    fetchMovieTrailer,
    resetTrailers,
    addMovieToWatchLaterList,
    resetWatchLaterList,
} from '../../actions/movieActions';
import MovieList from '../../components/MovieList/MovieList';
import {
    createAllMoviesSelector,
    createIsSearchingMoviesSelector,
    createFavoritesMoviesSelector,
    createMoviesTrailerSelector,
    createWatchLaterMoviesSelector,
} from '../../selectors/movieSelectors';
import FavoriteList from '../../components/FavoriteList/FavoriteList';
import {generateSearchMovieByQueryUrl} from '../../api/movieApi';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import WatchLaterList from '../../components/WatchLaterList/WatchLaterList';

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
        resetTrailers: PropTypes.func,
        addMovieToWatchLaterList: PropTypes.func,
        watchLaterMovies: PropTypes.array,
        resetWatchLaterList: PropTypes.func,
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
        resetTrailers: () => {},
        addMovieToWatchLaterList: () => {},
        watchLaterMovies: [],
        resetWatchLaterList: () => {},
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
        this.props.resetTrailers();
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
            isSearchingMovies,
            addMovieToWatchLaterList,
            watchLaterMovies,
            resetWatchLaterList,
        } = this.props;

        const {
            isFavoritesListShown,
            suggestions,
            value,
        } = this.state;

        return (
            <div className="m-app-search-view">
                {isSearchingMovies && <Loader />}

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
                        addMovieToWatchLaterList={addMovieToWatchLaterList}
                        isFavoriteListEmpty={this.checkFavoriteList()}
                    />
                    )}

                    {isFavoritesListShown && (
                    <React.Fragment>
                        <h2 className="m-app-search-view__title">Watch favourite trailers</h2>
                        <FavoriteList
                            favoriteMovies={favoriteMovies}
                            trailers={trailers}
                            resetFavorites={this.resetFavorites}
                        />
                    </React.Fragment>
                    )}

                    {(favoriteMovies.length > 0) && !isFavoritesListShown && (
                        <Button
                            onClick={this.showFavoriteList}
                            className="m-app-button--primary m-app-button--fixed"
                        >
                            Show Favorites List
                        </Button>
                    )}

                    <WatchLaterList
                        resetWatchLaterList={resetWatchLaterList}
                        watchLaterMovies={watchLaterMovies}
                    />
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
    const selectWatchLaterMoviesSelector = createWatchLaterMoviesSelector();

    return {
        movies: selectAllMovies(state),
        isSearchingMovies: selectIsSearchingMovies(state),
        favoriteMovies: selectFavoritesMovies(state),
        trailers: selectMoviesTrailerSelector(state),
        watchLaterMovies: selectWatchLaterMoviesSelector(state),
    };
};

const mapDispatchToProps = {
    searchMovie,
    addMovieToFavorites,
    resetFavorites,
    fetchMovieTrailer,
    resetTrailers,
    addMovieToWatchLaterList,
    resetWatchLaterList,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView);
