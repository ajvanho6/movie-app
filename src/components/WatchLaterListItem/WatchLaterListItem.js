import React from 'react';
import PropTypes from 'prop-types';
import ClampLines from 'react-clamp-lines';

import './WatchLaterListItem.scss';
import {IMAGE_PATH_POSTER, WATCH_LATER_POSTER} from '../../consts/imagePath';

const WatchLaterListItem = ({watchLaterMovie}) => {
    return (
        <li className="m-app-watch-later-list-item">
            <div className="m-app-watch-later-list-item__inner">
                <img
                    src={
                        watchLaterMovie.backdrop_path !== null
                            ? `${IMAGE_PATH_POSTER}${watchLaterMovie.backdrop_path}`
                            : `${WATCH_LATER_POSTER}`
                                }
                    alt={watchLaterMovie.title}
                />
                <div>
                    <h2>{watchLaterMovie.title}</h2>
                    <ClampLines
                        text={watchLaterMovie.overview}
                        id="desc"
                        lines={3}
                        ellipsis="..."
                        buttons={false}
                        innerElement="p"
                    />
                </div>
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
