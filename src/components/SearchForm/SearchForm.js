import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import './SearchForm.scss';

const getSuggestionValue = suggestion => suggestion.title;
const renderSuggestion = suggestion => (<span>{suggestion.title}</span>);

const SearchForm = ({
    handleSubmit,
    suggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    handleAutoSuggestChange,
    value,
    onSuggestionSelected,
}) => {
    const inputProps = {
        placeholder: 'Search Movies',
        value,
        onChange: handleAutoSuggestChange,
    };
    return (
        <form className="m-app-search-form" onSubmit={handleSubmit}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
            />
        </form>
    );
};

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    suggestions: PropTypes.array,
    onSuggestionsFetchRequested: PropTypes.func,
    onSuggestionsClearRequested: PropTypes.func,
    handleAutoSuggestChange: PropTypes.func,
    value: PropTypes.string,
    onSuggestionSelected: PropTypes.func,
};

SearchForm.defaultProps = {
    suggestions: [],
    onSuggestionsFetchRequested: () => {},
    onSuggestionsClearRequested: () => {},
    handleAutoSuggestChange: () => {},
    onSuggestionSelected: () => {},
    value: '',
};

export default SearchForm;
