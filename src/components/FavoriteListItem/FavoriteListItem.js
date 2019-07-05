import React from 'react';
import PropTypes from 'prop-types';

import './FavoriteListItem.scss';

const FavoriteListItem = ({favoriteMovie, trailer}) => {
    return (
        <li className="m-app-favorite-list-item">
            <div className="m-app-favorite-list-item__inner">
                {favoriteMovie.title}
                <div>
                    <iframe
                        width="420"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailer.results[0].key}`}
                        title="Title"
                    />
                </div>
            </div>
        </li>
    );
};

FavoriteListItem.propTypes = {
    favoriteMovie: PropTypes.object,
    trailer: PropTypes.object,
};

FavoriteListItem.defaultProps = {
    favoriteMovie: {},
    trailer: {},
};

export default FavoriteListItem;