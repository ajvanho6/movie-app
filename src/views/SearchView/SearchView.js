import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './SearchView.scss';
import SearchForm from '../../components/SearchForm/SearchForm';
import {searchMovie} from '../../actions/movieActions';


class SearchView extends Component {
    static propTypes = {
        searchMovie: PropTypes.func,
    };

    static defaultProps = {
        searchMovie: () => {},
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
        const {query} = this.state;
        return (
            <div className="m-app-search-view">
                <SearchForm
                    query={query}
                    handleSubmit={this.handleSubmit}
                    handleSearchQuery={this.handleSearchQuery}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movie: '',
    };
};

const mapDispatchToProps = {
    searchMovie,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView);
