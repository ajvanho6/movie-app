
import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faClock, faCheck} from '@fortawesome/free-solid-svg-icons';

import './MovieListItem.scss';
import {IMAGE_PATH_POSTER, DEFAULT_POSTER} from '../../consts/imagePath';


class MovieListItem extends Component {
    static propTypes = {
        movie: PropTypes.object.isRequired,
        addFavorites: PropTypes.func.isRequired,
        addToWatchList: PropTypes.func.isRequired,
        isItemInFavoriteList: PropTypes.bool,
        isItemInWatchLaterList: PropTypes.bool,
    };

    static defaultProps = {
        isItemInFavoriteList: false,
        isItemInWatchLaterList: false,
    };

    state = {
        isFavorite: false,
        isWatchLater: false,
    };

    componentDidMount() {
        if (this.props.isItemInFavoriteList) {
            this.setState({
                isFavorite: true,
            });
        }

        if (this.props.isItemInWatchLaterList) {
            this.setState({
                isWatchLater: true,
            });
        }
    }

    addFavorites = favoriteMovie => {
        this.setState({
            isFavorite: true,
        });
        this.props.addFavorites(favoriteMovie);
    }

    addToWatchList = watchListMovie => {
        this.setState({
            isWatchLater: true,
        });
        this.props.addToWatchList(watchListMovie);
    }

    render() {
        const {movie} = this.props;
        const {isFavorite, isWatchLater} = this.state;

        return (
            <li className="m-app-movie-list-item">
                <div className="m-app-movie-list-item__inner">
                    <div className="m-app-movie-list-item__image-holder">
                        <img
                            src={
                                movie.poster_path !== null
                                    ? `${IMAGE_PATH_POSTER}${movie.poster_path}`
                                    : `${DEFAULT_POSTER}`
                                }
                            alt={movie.title}
                        />
                        <div
                            className={classNames({
                                'm-app-movie-list-item__watch-later': true,
                                'm-app-movie-list-item__watch-later--is-watch-list': isWatchLater,
                            })}
                            onClick={() => this.addToWatchList(movie)}
                        >
                            <FontAwesomeIcon icon={isWatchLater ? faCheck : faClock} />
                        </div>
                    </div>
                    <div className="m-app-movie-list-item__info-holder">
                        <div className={classNames({
                            'm-app-movie-list-item__favorites': true,
                            'm-app-movie-list-item__favorites--is-favorite': isFavorite,
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
