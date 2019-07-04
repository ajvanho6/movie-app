import React, {Component} from 'react';

import './Footer.scss';

class Footer extends Component {
    state = {};

    render() {
        return (
            <div className="m-app-footer">
                Crafted by Ivan Baresic with <span role="img" aria-label="heart">&#128420;</span>
            </div>
        );
    }
}

export default Footer;
