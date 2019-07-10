import React from 'react';
import PropTypes from 'prop-types';

import './Page.scss';

const Page = ({
    footer,
    content,
    navigation,
}) => {
    return (
        <div className="m-app-page">
            {navigation || null}
            <div className="m-app-page__content">
                {content}
            </div>
            {footer}
        </div>
    );
};

Page.propTypes = {
    navigation: PropTypes.element,
    footer: PropTypes.element,
    content: PropTypes.element,
};

Page.defaultProps = {
    navigation: null,
    footer: null,
    content: null,
};

export default Page;
