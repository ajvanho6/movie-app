import React from 'react';

import './Loader.scss';

const Loader = props => {
    return (
        <div className="m-app-movie-loader">
            <div className="m-app-movie-loader__inner">
                <div className="lds-default">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
};

export default Loader;
