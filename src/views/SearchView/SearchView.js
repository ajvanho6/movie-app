import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './SearchView.scss';
import SearchForm from '../../components/SearchForm/SearchForm';
import {searchMovie} from '../../actions/movieActions';
import MovieList from '../../components/MovieList/MovieList';
import {createAllMoviesSelector, createIsSearchingMoviesSelector} from '../../selectors/movieSelectors';


class SearchView extends Component {
    static propTypes = {
        searchMovie: PropTypes.func,
        movies: PropTypes.array,
        isSearchingMovies: PropTypes.bool,
    };

    static defaultProps = {
        searchMovie: () => {},
        movies: [],
        isSearchingMovies: false,
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
        const {movies} = this.props;
        const {query} = this.state;

        return (
            <div className="m-app-search-view">
                <SearchForm
                    query={query}
                    handleSubmit={this.handleSubmit}
                    handleSearchQuery={this.handleSearchQuery}
                />
                <MovieList
                    movies={movies}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const selectAllMovies = createAllMoviesSelector();
    const selectIsSearchingMovies = createIsSearchingMoviesSelector();
    return {
        movies: selectAllMovies(state),
        isSearchingMovies: selectIsSearchingMovies(state),
    };
};

const mapDispatchToProps = {
    searchMovie,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView);
