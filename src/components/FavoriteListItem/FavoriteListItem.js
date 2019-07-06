import React from 'react';
import PropTypes from 'prop-types';

import './FavoriteListItem.scss';

const FavoriteListItem = ({favoriteMovie, trailer}) => {
    return (
        <li className="m-app-favorite-list-item">
            <div className="m-app-favorite-list-item__inner">
                <h2>{favoriteMovie.title}</h2>
                <div>
                    {trailer.results.length > 0

                        ? (
                            <iframe
                                width="420"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer.results[0].key}`}
                                title="Title"
                            />
                        )

                        : <p className="m-app-favorite-list-item__no-trailer">No trailer for this favorite</p>

                    }
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
