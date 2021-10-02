import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SuggestionsList from '../components/SuggestionsList';
import InfoBlock from '../components/InfoBlock';
import TextFieldWithDelay from '../components/TextFieldWithDelay';
import {
  actionGetSuggestionsPlacesStart,
  actionCleanSuggestions,
  actionSelectSuggestionPlace,
} from '../../state/ducks/searchBox/actions';

const StandAloneSearchBlock = props => {
  const {
    placeholder,
    label,
    searchBoxError,
    searchBoxSuggestedList,
    searchBoxSuggestedStoreUpdateTime,
    lastFinishedRequestTextValue,
    selectedSuggestionDescription,
    selectedSuggestion,
    actionCleanSuggestions,
    actionSelectSuggestionPlace,
    actionGetSuggestionsPlacesStart,
  } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    selectedSuggestion && setValue(selectedSuggestion.description);
  }, [selectedSuggestion]);

  const handleInputChange = value => {
    setValue(value);
    !value && actionCleanSuggestions();
  };

  const submitAction = value => {
    if (value && value !== selectedSuggestionDescription) {
      actionGetSuggestionsPlacesStart(value);
    }
  };

  const selectPlace = placeJson => {
    console.warn('SELECT PALCE', placeJson);
    actionSelectSuggestionPlace(placeJson);
  };

  const isEmptyResponse =
    !!searchBoxSuggestedStoreUpdateTime &&
    !searchBoxSuggestedList &&
    value === lastFinishedRequestTextValue;

  return (
    <div className="search-container">
      <TextFieldWithDelay
        placeholder={placeholder}
        label={label}
        value={value}
        onChange={handleInputChange}
        actionAfterDelay={submitAction}
        delaySecondsValueBeforeActionSubmit={0.5}
      />
      {searchBoxError && (
        <InfoBlock
          title="Problem with connect to Google API"
          description={`Details: ${searchBoxError}`}
          text={searchBoxError}
          type="error"
        />
      )}
      {isEmptyResponse && (
        <InfoBlock
          title="No places find for this query"
          text="Please, check input value"
          type="message"
        />
      )}
      {searchBoxSuggestedList && (
        <SuggestionsList
          onListItemClick={selectPlace}
          list={searchBoxSuggestedList}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ searchBoxReducer }) => {
  const {
    searchBoxSuggestedList,
    searchBoxSuggestedStoreUpdateTime,
    selectedSuggestion,
  } = searchBoxReducer;
  return {
    searchBoxSuggestedList,
    searchBoxSuggestedStoreUpdateTime,
    selectedSuggestion,
  };
};

export default connect(mapStateToProps, {
  actionGetSuggestionsPlacesStart,
  actionCleanSuggestions,
  actionSelectSuggestionPlace,
})(StandAloneSearchBlock);
