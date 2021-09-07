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
import React, { Component } from 'react';
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
} from 'react-instantsearch-dom';
import orderBy from 'lodash/orderBy';
import Autocomplete from './Autocomplete';
import './App.css';

const VirtalSearchBox = connectSearchBox(() => null);

const searchClient = algoliasearch(
  'NUY0SFG8TT',
  'f48ef2b671d34701751932b3236ad4c2'
);

/* const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'test_carjager',
  getSearchParams({ state }) {
    return { hitsPerPage: state.query ? 5 : 10 };
  },
});

const onSuggestionSelected = (_, { suggestion }) => {
  const [
    category,
  ] = suggestion.instant_search.facets.exact_matches.categories;

  this.setState({
    query: suggestion.query,
    categories:
      category && category.value !== 'ALL_CATEGORIES' ? [category.value] : [],
  });
};

const onSuggestionCleared = () => {
  this.setState({
    query: '',
    categories: [],
  });
};

function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">Test Algolia</a>
        </h1>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          refresh={false}
          indexName="test_carjager"
        >
          <div id="test"></div>
          <h1>Brand</h1>
          <RefinementList
            attribute="brand"
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
          {/!* On peut filtrer dans transformItems -> ne pas afficher le filtre === brand *!/}
          <CurrentRefinements />
          <ClearRefinements />
          <div className="search-panel">
            <div className="search-panel__results">
              <SearchBox
                id="test"
                searchAsYouType={false}
                className="searchbox"
                translations={{
                  placeholder: 'Recherche ta voiture weshh',
                }}
              />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

function Hit(props) {
  return (
    <article>
      <p>
        <code>{`${props.hit.brand} ${props.hit.model}`}</code>
      </p>
      <p>
        <code>
          {props.hit.comments.length > 50
            ? `${props.hit.comments.slice(0, 50)}...`
            : props.hit.comments}
        </code>
      </p>
    </article>
  );
}

window.addEventListener('load', function() {
  autocomplete({
    container: '#test',
    plugins: [querySuggestionsPlugin],
    openOnFocus: true,
  });
});


Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;*/

class App extends Component {
  state = {
    searchState: {
      query: this.props.query || "",
      refinementList: this.props.refinementList,
      range: this.props.range,
      page: 1,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        searchState: {
          query: this.props.query || "",
          refinementList: this.props.refinementList,
          range: this.props.range,
          page: 1,
        },
      });
    }
  }

  handleSearchStateChange = (searchState) => {
    console.log(searchState);
    this.setState({
      searchState,
    });
  };
  onSuggestionSelected = (_, { suggestion }) => {
    const { searchState } = this.state;
    console.log(searchState);
    const newSearch = (searchState.query = `${suggestion.brand} ${suggestion.model}`);
    console.log("lol", newSearch);
    this.setState({
      newSearch,
    });
  };

  onSuggestionCleared = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state.searchState;
    console.log("test", query);
    return (
      <div className="container">
        <h1>React InstantSearch - Results page with autocomplete</h1>
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
            <Configure hitsPerPage={5} distinct />
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
}

function Hit(props) {
  return (
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
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
