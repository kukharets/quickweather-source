import { useState } from 'react';

import { useServices } from '@providers/ServicesProvider';
import { IGoogleAutocompletePredictionPlace, IGooglePlaceFull } from '@slices/app';

export const useGooglePlaces = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { placesService } = useServices();

  const handleGetPlaceDetails = (
    place: IGoogleAutocompletePredictionPlace | { place_id: string },
  ): Promise<IGooglePlaceFull> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      placesService?.getDetails(
        { placeId: place.place_id },
        ({ place_id = '', formatted_address, geometry: { location } = {} }, status) => {
          setIsLoading(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && location) {
            resolve({
              place_id,
              coordinates: {
                lat: location.lat(),
                lng: location.lng(),
              },
              structured_formatting: {
                main_text: formatted_address?.split(',')[0] || '',
                secondary_text: formatted_address?.split(',')?.[1] || '',
              },
            });
          } else {
            reject(`Failed to get place details: ${status}`);
          }
        },
      );
    });
  };

  return { handleGetPlaceDetails, isLoading };
};
