
import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faClock} from '@fortawesome/free-solid-svg-icons';

import './MovieListItem.scss';
import {IMAGE_PATH_POSTER} from '../../consts/imagePath';

const DEFAULT_POSTER = 'https://via.placeholder.com/185x278';


class MovieListItem extends Component {
    static propTypes = {
        movie: PropTypes.object.isRequired,
        addFavorites: PropTypes.func.isRequired,
        isFavoriteListEmpty: PropTypes.bool,
        addToWatchList: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isFavoriteListEmpty: false,
    };

    state = {
        isFavorite: false,
    };

    addFavorites = favoriteMovie => {
        this.setState({
            isFavorite: true,
        });
        this.props.addFavorites(favoriteMovie);
    }

    addToWatchList = watchListMovie => {
        this.props.addToWatchList(watchListMovie);
    }

    render() {
        const {movie, isFavoriteListEmpty} = this.props;
        const {isFavorite} = this.state;

        return (
            <li className="m-app-movie-list-item">
                <div className="m-app-movie-list-item__inner">
                    <img
                        src={
                                movie.poster_path !== null
                                    ? `${IMAGE_PATH_POSTER}${movie.poster_path}`
                                    : `${DEFAULT_POSTER}`
                                }
                        alt={movie.title}
                    />
                    <div className="m-app-movie-list-item__watch-later">
                        <FontAwesomeIcon onClick={() => this.addToWatchList(movie)} icon={faClock} />
                    </div>
                    <div className="m-app-movie-list-item__info-holder">
                        <div className={classNames({
                            'm-app-movie-list-item__favorites': true,
                            'm-app-movie-list-item__favorites--is-favorite': isFavorite && isFavoriteListEmpty,
                        })}
                        >
                            <span>Add to favorites</span>
                            <FontAwesomeIcon onClick={() => this.addFavorites(movie)} icon={faStar} />
                        </div>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <span className="m-app-movie-list-item__rating">Rating: {movie.vote_average}/10 from {movie.vote_count} users</span>
                        <span className="m-app-movie-list-item__release">Release date: {moment(movie.release_date).format('MMMM Do YYYY')}</span>
                    </div>
                </div>
            </li>
        );
    }
}

export default MovieListItem;
