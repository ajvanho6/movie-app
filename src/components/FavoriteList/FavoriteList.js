import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FavoriteList.scss';
import Button from '../Button/Button';
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem';

class FavoriteList extends Component {
    static propTypes = {
        resetFavorites: PropTypes.func,
        favoriteMovies: PropTypes.array,

    };

    static defaultProps = {
        resetFavorites: () => {},
        favoriteMovies: [],
    };

    state = {};

    render() {
        const {favoriteMovies, resetFavorites} = this.props;

        return (
            <ul className="m-app-favorite-list">
                {
                    favoriteMovies.map(favoriteMovie => {
                        return (
                            <FavoriteListItem
                                key={favoriteMovie.id || null}
                                favoriteMovie={favoriteMovie}
                            />
                        );
                    })
                }
                <Button
                    onClick={resetFavorites}
                >
                    Remove favorites
                </Button>
            </ul>
        );
    }
}

export default FavoriteList;
