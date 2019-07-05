import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FavoriteList.scss';
import Button from '../Button/Button';
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem';

class FavoriteList extends Component {
    static propTypes = {
        resetFavorites: PropTypes.func,
        favoriteMovies: PropTypes.array,
        trailers: PropTypes.array,

    };

    static defaultProps = {
        resetFavorites: () => {},
        favoriteMovies: [],
        trailers: [],
    };

    state = {};

    render() {
        const {favoriteMovies, resetFavorites, trailers} = this.props;

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
                >
                    Remove favorites
                </Button>
            </ul>
        );
    }
}

export default FavoriteList;
