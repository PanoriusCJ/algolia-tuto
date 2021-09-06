import React from 'react';
import { connectAutoComplete } from 'react-instantsearch-dom';

const Suggestions = props => (
  <ul>
    {props.hit.map(hit => (
      <li key={hit.objectID}>{hit.name}</li>
    ))}
  </ul>
);

export default connectAutoComplete(Suggestions);
