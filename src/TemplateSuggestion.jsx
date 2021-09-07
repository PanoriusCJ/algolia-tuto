import React from 'react';

export function TemplateSuggestions({ hit, components }) {
  return (
    <a href={hit.brand} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="name" />
        </div>
      </div>
    </a>
  );
}
