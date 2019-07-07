import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './WatchLaterList.scss';
import Button from '../Button/Button';
import WatchLaterListItem from '../WatchLaterListItem/WatchLaterListItem';

class WatchLaterList extends Component {
    static propTypes = {
        resetWatchLaterList: PropTypes.func,
        watchLaterMovies: PropTypes.array,
    };

    static defaultProps = {
        resetWatchLaterList: () => {},
        watchLaterMovies: [],
    };

    state = {};

    render() {
        const {watchLaterMovies, resetWatchLaterList} = this.props;

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
                    className="m-app-button--primary"
                >
                    Remove movies from watch list
                </Button>
            </ul>
        );
    }
}

export default WatchLaterList;
