import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './MovieList.scss';
import {IMAGE_PATH_POSTER} from '../../consts/imagePath';

const MovieList = ({movies}) => {
    return (
        <ul className="m-app-movie-list">
            {
                movies.map(movie => {
                    return (
                        <li key={movie.id} className="m-app-movie-list__item">
                            <div className="m-app-movie-list__item-inner">
                                <img src={`${IMAGE_PATH_POSTER}${movie.poster_path}`} alt={movie.title} />
                                <div className="m-app-movie-list__info-holder">
                                    <h2>{movie.title}</h2>
                                    <p>{movie.overview}</p>
                                    <span className="m-app-movie-list__rating">Rating: {movie.vote_average}/10 from {movie.vote_count} users</span>
                                    <span className="m-app-movie-list__release">Release date: {moment(movie.release_date).format('MMMM Do YYYY')}</span>
                                </div>
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    );
};

MovieList.propTypes = {
    movies: PropTypes.array,
};

MovieList.defaultProps = {
    movies: [],
};

export default MovieList;
