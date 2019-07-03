import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const Button = ({className, children, ...rest}) => {
    const classes = classNames(
        'm-app-button',
        className,
    );

    return (
        <button type="button" className={classes} {...rest}>
            {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
};

Button.defaultProps = {
    className: '',
};

export default Button;
