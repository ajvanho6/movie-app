import React from 'react';
import PropTypes from 'prop-types';

import './SearchForm.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const SearchForm = ({query, handleSubmit, handleSearchQuery}) => {
    return (
        <form className="m-app-search-form" onSubmit={handleSubmit}>
            <Input
                value={query}
                onChange={e => handleSearchQuery(e)}
            />
            <Button
                type="submit"
                onClick={handleSubmit}
            >
                    Search
            </Button>

        </form>
    );
};

SearchForm.propTypes = {
    query: PropTypes.string,
    handleSearchQuery: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
    query: '',
};

export default SearchForm;
