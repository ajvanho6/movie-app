import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Page.scss';

class Page extends Component {
    static propTypes = {
        navigation: PropTypes.element,
        footer: PropTypes.element,
        content: PropTypes.element,
    };

    static defaultProps = {
        navigation: null,
        footer: null,
        content: null,
    }

    state = {};

    render() {
        const {
            footer,
            content,
            navigation,
        } = this.props;

        return (
            <div className="m-app-page">
                {navigation || null}
                <div className="m-app-page__content">
                    {content}
                </div>
                {footer}
            </div>
        );
    }
}

export default Page;
