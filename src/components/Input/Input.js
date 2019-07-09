import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';

const Input = ({className, ...rest}) => {
    const classes = classNames(
        className,
    );

    return (
        <div className="m-app-input">
            <input className={classes} {...rest} />
        </div>
    );
};

Input.propTypes = {
    className: PropTypes.string,
};

Input.defaultProps = {
    className: '',
};

export default Input;
