import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Notifications from 'react-notify-toast';


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
        isWatchLaterListShown: false,
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

    showWatchLaterList = () => {
        this.setState({
            isWatchLaterListShown: true,
        });
    }

    hideWatchLaterList = () => {
        this.setState({
            isWatchLaterListShown: false,
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

    resetWatchLaterList = () => {
        this.setState({
            value: '',
        });
        this.props.resetWatchLaterList();
        this.hideWatchLaterList();
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

    onBack = () => {
        this.hideFavoriteList();
        this.hideWatchLaterList();
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
        } = this.props;

        const {
            isFavoritesListShown,
            isWatchLaterListShown,
            suggestions,
            value,
        } = this.state;

        return (
            <div className="m-app-search-view">
                {isSearchingMovies && <Loader />}

                {!isFavoritesListShown && !isWatchLaterListShown && (
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
                    {(movies.length > 0)
                        && !isFavoritesListShown
                        && !isWatchLaterListShown && (
                        <MovieList
                            movies={movies}
                            favoriteMovies={favoriteMovies}
                            watchLaterMovies={watchLaterMovies}
                            fetchMovieTrailer={fetchMovieTrailer}
                            addMovieToFavorites={addMovieToFavorites}
                            addMovieToWatchLaterList={addMovieToWatchLaterList}
                        />
                    )}

                    {isFavoritesListShown && (
                    <React.Fragment>
                        <h2 className="m-app-search-view__title">Watch favourite trailers</h2>
                        <div className="m-app-search-view__back" onClick={this.onBack}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            Back
                        </div>
                        <FavoriteList
                            favoriteMovies={favoriteMovies}
                            trailers={trailers}
                            resetFavorites={this.resetFavorites}
                        />
                    </React.Fragment>
                    )}

                    {(favoriteMovies.length > 0) && !isFavoritesListShown && !isWatchLaterListShown && (
                        <Button
                            onClick={this.showFavoriteList}
                            className="m-app-button--primary m-app-button--fixed"
                        >
                            Show Favorites List
                        </Button>
                    )}

                    {isWatchLaterListShown && (
                        <React.Fragment>
                            <h2 className="m-app-search-view__title">Watch later list</h2>
                            <div className="m-app-search-view__back" onClick={this.onBack}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                                Back
                            </div>
                            <WatchLaterList
                                resetWatchLaterList={this.resetWatchLaterList}
                                watchLaterMovies={watchLaterMovies}
                            />
                        </React.Fragment>
                    )}

                    {(watchLaterMovies.length > 0) && !isWatchLaterListShown && !isFavoritesListShown && (
                    <Button
                        onClick={this.showWatchLaterList}
                        className="m-app-button--primary m-app-button--fixed m-app-button--fixed-watch"
                    >
                        Watch List
                    </Button>
                    )}
                </div>
                <Notifications />
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
