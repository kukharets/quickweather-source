import { useState } from 'react';

import { IGoogleAutocompletePredictionPlace } from '@slices/app';

import { useServices } from '@providers/ServicesProvider';

export const useGoogleAutocomplete = () => {
  const [predictions, setPredictions] = useState<IGoogleAutocompletePredictionPlace[]>([]);
  const handleCleanPredictions = () => setPredictions([]);

  const { autocompleteService } = useServices();

  const serviceGetPlacePredictions = async (input: string): Promise<IGoogleAutocompletePredictionPlace[]> =>
    new Promise((resolve) => {
      autocompleteService?.getPlacePredictions({ input, types: ['(cities)'] }, (predictions, status) => {
        switch (status) {
          case window.google.maps.places.PlacesServiceStatus.OK:
          case window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
            resolve(
              predictions?.map(({ place_id, structured_formatting }) => ({ place_id, structured_formatting })) || [],
            );
            break;
          default:
            resolve([]);
        }
      });
    });

  const handleGetPlacePredictionsCallback = async (value: string) => {
    const predictions = await serviceGetPlacePredictions(value);
    setPredictions(predictions);
  };

  return { predictions, handleCleanPredictions, handleGetPlacePredictionsCallback };
};
