import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  ClearRefinements,
  CurrentRefinements,
  RefinementList,
  Configure,
  connectAutoComplete,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import orderBy from 'lodash/orderBy';
import Suggestions from './Suggestions.jsx';

const searchClient = algoliasearch(
  'NUY0SFG8TT',
  'f48ef2b671d34701751932b3236ad4c2'
);

const Autocomplete = ({ hits, currentRefinement, refine }) => (
  <ul>
    <li>
      <input
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
      />
    </li>
    {hits.map(hit => (
      <li key={hit.objectID}>{hit.brand}</li>
    ))}
  </ul>
);

const CustomAutocomplete = connectAutoComplete(Autocomplete);

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
          {/* On peut filtrer dans transformItems -> ne pas afficher le filtre === brand */}
          <CurrentRefinements />
          <ClearRefinements />
          <div className="search-panel">
            <div className="search-panel__results">
              <SearchBox
                searchAsYouType={false}
                className="searchbox"
                translations={{
                  placeholder: 'Recherche ta voiture weshh',
                }}
              />
              <CustomAutocomplete />
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

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
