import React, { useLayoutEffect, useRef, useState } from 'react';

import { useOutsideClick } from '@hooks/useOutsideClick';
import { useGoogleAutocomplete } from '@hooks/useGoogleAutocomplete';

import { IGoogleAutocompletePredictionPlace, IGooglePlaceFull } from '@slices/app';

import {
  CloseIcon,
  InputWrapper,
  PlacesSearchWrapper,
  PredictionItem,
  SearchInput,
} from '@containers/PlacesSearchAutocomplete.styles';

export const PlacesSearchAutocomplete = ({
  handleSelectPlace,
}: {
  handleSelectPlace: (place: IGooglePlaceFull) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const { predictions, handleCleanPredictions, handleGetPlacePredictionsCallback } = useGoogleAutocomplete();

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelectPrediction = (place: IGoogleAutocompletePredictionPlace) => {
    handleSelectPlace(place);
    handleCleanPredictions();
    setValue(`${place.structured_formatting?.main_text}, ${place.structured_formatting?.secondary_text}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleGetPlacePredictionsCallback(e.target.value);
  };

  const handleClearInput = () => {
    setValue('');
    handleCleanPredictions();
    inputRef.current?.focus();
  };

  const { ref: outsideClickRef } = useOutsideClick({ handler: handleCleanPredictions });
  return (
    <PlacesSearchWrapper ref={outsideClickRef}>
      <InputWrapper>
        <SearchInput ref={inputRef} placeholder={'...enter location'} value={value} onChange={handleInputChange} />
        {!!value && <CloseIcon onClick={handleClearInput} />}
      </InputWrapper>
      {predictions.map((prediction) => (
        <PredictionItem onClick={() => handleSelectPrediction(prediction)} key={prediction.place_id}>
          {prediction?.structured_formatting?.main_text}, {prediction?.structured_formatting?.secondary_text}
        </PredictionItem>
      ))}
    </PlacesSearchWrapper>
  );
};
