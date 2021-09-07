import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Highlight,
  connectAutoComplete,
  connectHighlight,
} from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';

const HighlightTmplt = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });
  console.log(parsedHit);
  console.log(hit);
  return (
    <span>
      {parsedHit.length > 0 ? (
        parsedHit.map((part, index) =>
          part.isHighlighted ? (
            <mark key={index}>{part.value}</mark>
          ) : (
            <span key={index}>{part.value}</span>
          )
        )
      ) : (
        <span key={hit.id}>{`${hit.brand} ${hit.model}`}</span>
      )}
    </span>
  );
};
const CustomHighlight = connectHighlight(HighlightTmplt);

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onSuggestionCleared: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    console.log(hit);
    return `${hit.brand} ${hit.model}`;
  }

  renderSuggestion(hit) {
    return (
      <CustomHighlight
        attribute={['brand', 'model']}
        hit={hit}
        tagName="mark"
      />
    );
  }

  render() {
    const { hits, onSuggestionSelected } = this.props;
    const { value } = this.state;
    console.log(value);
    const inputProps = {
      placeholder: 'Search for a car...',
      onChange: this.onChange,
      value,
    };

    return (
      <AutoSuggest
        suggestions={hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connectAutoComplete(AutoComplete);
