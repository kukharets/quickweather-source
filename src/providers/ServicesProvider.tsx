import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import styled from 'styled-components';

import { TextBasic } from '@root/App.styles';

const ErrorMessage = styled(TextBasic)`
  position: absolute;
  top: 120px;
  left: 20px;
  color: ${({ theme }) => theme.colors.error};
  background: rgba(255, 252, 240, 0.34);
  padding: 10px 20px;
  width: 100%;
  height: 300px;
`;

interface ServicesContextType {
  autocompleteService: google.maps.places.AutocompleteService | null;
  placesService: google.maps.places.PlacesService | null;
  isLoading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleApi = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places&language=en`;
        script.onload = () => resolve();
        script.onerror = () => reject('Failed to load Google Maps API');
        document.head.appendChild(script);
      });
    };

    loadGoogleApi()
      .then(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          const newAutocompleteService = new window.google.maps.places.AutocompleteService();
          const newPlacesService = new window.google.maps.places.PlacesService(document.createElement('div')); // Placeholder for PlacesService
          setAutocompleteService(newAutocompleteService);
          setPlacesService(newPlacesService);
        } else {
          throw new Error('Google Maps API is not available.');
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <ServicesContext.Provider value={{ autocompleteService, placesService, isLoading, error }}>
      {children}
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesContext');
  }
  return context;
};
