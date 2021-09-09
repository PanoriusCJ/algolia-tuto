/*import React, { Component } from 'react';
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
    console.log(newValue);
    if (!newValue) {
      this.props.onSuggestionCleared();
    }
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

  handleClick = (_, { suggestion }) => {
    console.log(`${suggestion.brand} ${suggestion.model}`);
    this.props.onSuggestionSelected(`${suggestion.brand} ${suggestion.model}`);
  };

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
    console.log(this.props);
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
}*/
import React, { useState } from 'react';
import { Highlight, connectAutoComplete, connectHighlight } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
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
const Autocomplete = (props) => {
  console.log({ props });

  const [value, setValue] = useState(props.currentRefinement);

  const onChange = (_, { newValue }) => {
    if (!newValue) {
      props.onSuggestionCleared();
    }

    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    props.refine(value);
  };

  const onSuggestionsClearRequested = () => {
    props.refine();
  };

  const getSuggestionValue = (hit) => {
    return `${hit.brand} ${hit.model}`;
  };

  const renderSuggestion = (hit) => {
    return (
      <CustomHighlight
        attribute={['brand', 'model']}
        hit={hit}
        tagName="mark"
      />
    );
  }

  const { hits, onSuggestionSelected } = props;
  const inputProps = {
    placeholder: 'Search for a book...',
    onChange: onChange,
    value,
  };

  return (
    <AutoSuggest
      suggestions={hits}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

Autocomplete.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  onSuggestionCleared: PropTypes.func.isRequired,
};

export default connectAutoComplete(Autocomplete);

/*import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

export function Autocomplete(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      ...props,
    });
    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}*/
