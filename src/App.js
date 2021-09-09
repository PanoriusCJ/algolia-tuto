/* import React from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  ClearRefinements,
  CurrentRefinements,
  RefinementList,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import orderBy from 'lodash/orderBy';
import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import algoliasearch from 'algoliasearch';
import Autocomplete from './Autocomplete.jsx';*/
/* import React, { Component } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  Highlight,
  connectSearchBox,
  Pagination,
  ClearRefinements,
  CurrentRefinements,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-dom';
import orderBy from 'lodash/orderBy';
import Autocomplete from './Autocomplete';
import './App.css';

/* TODO NOT TODO - FONCTIONNE PAS LORS SUR SELECT DANS AUTOCOMPLETE */
/* class App extends Component {
  state = {
    searchState: {
      query: this.props.query || '',
    },
  };

  handleSearchStateChange = searchState => {
    console.log(searchState);
    this.setState({
      searchState,
    });
  };
  onSuggestionSelected = (_, { suggestion }) => {
    const { searchState } = this.state;
    console.log(searchState);
    console.log(suggestion);
    this.setState({
      searchState: {
        ...searchState,
        query: `${suggestion.brand}${suggestion.model}`,
      },
    });
  };

  onSuggestionCleared = () => {
    const { searchState } = this.state;
    console.log(searchState);
    this.setState({
      searchState: {
        ...searchState,
        query: '',
      },
    });
  };

  render() {
    const { query } = this.state.searchState;
    console.log('test', query);
    return (
      <div className="container">
        <h1>Algo Test CJ</h1>
        <InstantSearch
          indexName="test_carjager"
          searchClient={searchClient}
          onSearchStateChange={this.handleSearchStateChange}
          searchState={this.state.searchState}
        >
          <h1>Brand</h1>
          <RefinementList
            attribute={'brand'}
            facetOrdering={false}
            operator="or"
            transformItems={items =>
              orderBy(items, ['label', 'count'], ['asc', 'desc'])
            }
            showMore
          />
          <h1>Model</h1>
          <RefinementList
            attribute="model"
            facetOrdering={false}
            operator="or"
            transformItems={items =>
              orderBy(items, ['label', 'count'], ['asc', 'desc'])
            }
            showMore
          />
          <CurrentRefinements />
          <ClearRefinements />
          <div className="search-panel">
            <Configure
              restrictSearchableAttributes={['brand', 'model']}
              hitsPerPage={5}
              distinct
            />
            <Autocomplete
              onSuggestionSelected={this.onSuggestionSelected}
              onSuggestionCleared={this.onSuggestionCleared}
            />
            <div className="search-panel__results">
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    );
  }
}*/

/* TODO NOT TODO - FONCTIONNE TRES BIEN */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import orderBy from 'lodash/orderBy';
import {
  InstantSearch,
  Configure,
  Hits,
  connectSearchBox,
  ClearRefinements,
  CurrentRefinements,
  RefinementList,
} from 'react-instantsearch-dom';

import Autocomplete from './Autocomplete.jsx';
import './App.css';

const VirtualSearchBox = connectSearchBox(() => null);
function App() {
  const searchClient = algoliasearch(
    'NUY0SFG8TT',
    'f48ef2b671d34701751932b3236ad4c2'
  );

  const [query, setQuery] = useState('');

  const onSuggestionSelected = (e, { suggestion }) => {
    setQuery(`${suggestion.brand} ${suggestion.model}`);
  };

  const onSuggestionCleared = () => {
    setQuery('');
  };

  return (
    <div className="container">
      <h1>Test Algolia Carjager</h1>
      <InstantSearch indexName="test_carjager" searchClient={searchClient}>
        <Configure
          hitsPerPage={5}
          restrictSearchableAttributes={['brand', 'model']}
        />
        <Autocomplete
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionCleared={onSuggestionCleared}
        />
      </InstantSearch>

      <InstantSearch indexName="test_carjager" searchClient={searchClient}>
        <h1>Brand</h1>
        <RefinementList
          attribute={'brand'}
          facetOrdering={false}
          operator="and"
          transformItems={items =>
            orderBy(items, ['label', 'count'], ['asc', 'desc'])
          }
          showMore
        />
        <h1>Model</h1>
        <RefinementList
          attribute="model"
          facetOrdering={false}
          operator="and"
          transformItems={items =>
            orderBy(items, ['label', 'count'], ['asc', 'desc'])
          }
          showMore
        />
        <CurrentRefinements />
        <ClearRefinements />
        <Configure restrictSearchableAttributes={['brand', 'model']} />
        <VirtualSearchBox defaultRefinement={query} />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

function Hit(props) {
  console.log(props.hit.pictures);
  const bg =
    props.hit.pictures.length > 0
      ? `https://public.carjager.com/512x288/${props.hit.pictures[0].path}`
      : `https://test.carjager.com/build/images/placeholder-cars-blur.1daa7f7a.jpg`;
  return (
    <div className="container">
      <img
        src={bg}
        style={{
          height: '288px',
          width: '200px',
        }}
      />
      <article>
        <p>
          <code>{`${props.hit.brand} ${props.hit.model}`}</code>
        </p>
        <p>
          <code>
            {props.hit.comments
              ? props.hit.comments.length > 50
                ? `${props.hit.comments.slice(0, 50)}...`
                : props.hit.comments
              : 'no comments'}
          </code>
        </p>
      </article>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
