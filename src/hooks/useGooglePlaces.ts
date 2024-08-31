import { useServices } from '@providers/ServicesProvider';
import { IGoogleAutocompletePredictionPlace } from '@slices/app';
import { useState } from 'react';

export const useGooglePlaces = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { placesService } = useServices();

  const handleGetPlaceDetails = (place: IGoogleAutocompletePredictionPlace): Promise<{ lat: number; lng: number }> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      placesService?.getDetails({ placeId: place.place_id }, (placeResult, status) => {
        setIsLoading(false);
        if (status === google.maps.places.PlacesServiceStatus.OK && placeResult?.geometry?.location) {
          resolve({
            lat: placeResult.geometry.location.lat(),
            lng: placeResult.geometry.location.lng(),
          });
        } else {
          reject(`Failed to get place details: ${status}`);
        }
      });
    });
  };

  return { handleGetPlaceDetails, isLoading };
};
