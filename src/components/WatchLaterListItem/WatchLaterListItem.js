import React from 'react';
import PropTypes from 'prop-types';

import './WatchLaterListItem.scss';

const WatchLaterListItem = ({watchLaterMovie}) => {
    return (
        <li className="m-app-watch-later-list-item">
            <div className="m-app-watch-later-list-item__inner">
                <h2>{watchLaterMovie.title}</h2>
            </div>
        </li>
    );
};

WatchLaterListItem.propTypes = {
    watchLaterMovie: PropTypes.object,
};

WatchLaterListItem.defaultProps = {
    watchLaterMovie: {},
};

export default WatchLaterListItem;
