import { useState } from 'react';
import { useServices } from '../providers/ServicesProvider';
import { IGoogleAutocompletePredictionPlace } from '../slices/app';

export const useGoogleAutocomplete = () => {
  const { autocompleteService } = useServices();

  const [predictions, setPredictions] = useState<IGoogleAutocompletePredictionPlace[]>([]);
  const serviceGetPlacePredictions = async (input: string): Promise<IGoogleAutocompletePredictionPlace[]> => {
    return new Promise((resolve) => {
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
  };
  const handleCleanPredictions = () => {
    setPredictions([]);
  };

  const handleGetPlacePredictionsCallback = async (value: string) => {
    const predictions = await serviceGetPlacePredictions(value);
    setPredictions(predictions);
  };

  return { predictions, handleCleanPredictions, handleGetPlacePredictionsCallback };
};
