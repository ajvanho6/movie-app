import React from 'react';
import PropTypes from 'prop-types';

import './FavoriteList.scss';
import Button from '../Button/Button';
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem';

const FavoriteList = ({
    favoriteMovies,
    resetFavorites,
    trailers,
}) => {
    return (
        <ul className="m-app-favorite-list">
            {
                favoriteMovies.map((favoriteMovie, i) => {
                    return (
                        <FavoriteListItem
                            key={favoriteMovie.id || null}
                            favoriteMovie={favoriteMovie}
                            trailer={trailers[i]}
                        />
                    );
                })
            }
            <Button
                onClick={resetFavorites}
                className="m-app-button--primary m-app-button--reverted-color"
            >
            Remove favorites
            </Button>
        </ul>
    );
};

FavoriteList.propTypes = {
    resetFavorites: PropTypes.func,
    favoriteMovies: PropTypes.array,
    trailers: PropTypes.array,

};

FavoriteList.defaultProps = {
    resetFavorites: () => {},
    favoriteMovies: [],
    trailers: [],
};

export default FavoriteList;
