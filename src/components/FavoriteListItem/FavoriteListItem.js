import React from 'react';
import PropTypes from 'prop-types';

import './FavoriteListItem.scss';

const FavoriteListItem = ({favoriteMovie}) => {
    return (
        <li className="m-app-favorite-list-item">
            <div className="m-app-favorite-list-item__inner">
                {favoriteMovie.title}
            </div>
        </li>
    );
};

FavoriteListItem.propTypes = {
    favoriteMovie: PropTypes.object,
};

FavoriteListItem.defaultProps = {
    favoriteMovie: {},
};

export default FavoriteListItem;
