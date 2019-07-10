import React from 'react';
import PropTypes from 'prop-types';

import './WatchLaterList.scss';
import Button from '../Button/Button';
import WatchLaterListItem from '../WatchLaterListItem/WatchLaterListItem';

const WatchLaterList = ({watchLaterMovies, resetWatchLaterList}) => {
    return (
        <ul className="m-app-watch-later-list">
            {
                    watchLaterMovies.map(watchLaterMovie => {
                        return (
                            <WatchLaterListItem
                                key={watchLaterMovie.id || null}
                                watchLaterMovie={watchLaterMovie}
                            />
                        );
                    })
                }
            <Button
                onClick={resetWatchLaterList}
                className="m-app-button--primary m-app-button--reverted-color"
            >
                    Remove movies from watch list
            </Button>
        </ul>
    );
};

WatchLaterList.propTypes = {
    resetWatchLaterList: PropTypes.func,
    watchLaterMovies: PropTypes.array,
};

WatchLaterList.defaultProps = {
    resetWatchLaterList: () => {},
    watchLaterMovies: [],
};

export default WatchLaterList;
