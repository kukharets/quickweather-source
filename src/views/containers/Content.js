import React, { lazy, Suspense } from 'react';
const StandAlonePlacesSearch = lazy(() => import('./StandAloneSearchBlock'));
import SelectedPlaceBlock from './placeWeather/SelectedPlaceBlock';
import PlacesList from './PlacesList';
import TextField from "@material-ui/core/TextField";

const standAloneSearchBlockSuspense = () => <div className="text-search-field">
    <TextField
        fullWidth
        placeholder={'Loading API'}
        label={"Please wait..."}
        type="search"
    />
</div>;

const Content = () => {
  return (
    <div className="content">
        <Suspense fallback={standAloneSearchBlockSuspense()}>
            <StandAlonePlacesSearch
                placeholder="...just start typing"
                label="Find place for get weather"
            />
        </Suspense>
      <SelectedPlaceBlock />
      <PlacesList />
    </div>
  );
};

export default Content;
