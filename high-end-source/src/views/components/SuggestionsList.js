import React from 'react';

function SuggestionsList({ list, listItemClass, onListItemClick }) {
  return (
    <div className="suggestion-list">
      {list.map(item => (
        <span
          key={`Place ${item.placeID}`}
          onClick={onListItemClick(item)}
          className={listItemClass}
          value={item.place_id}
          data-role="suggestion"
          role="button"
        >
          <span>{item.description}</span>
        </span>
      ))}
    </div>
  );
}

export default SuggestionsList;
