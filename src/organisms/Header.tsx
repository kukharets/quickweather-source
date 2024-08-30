import React from 'react';
import { TextLarge, TextSmall } from '../containers/App.styles';
import { theme } from '../containers/App.styles';
import { ExpandMenu } from '../atoms/ExpandMenu';
import { useSelector } from 'react-redux';
import { selectSelectedPlace } from '../selectors/app';
import { HeaderLegend, HeaderWrapper } from './Header.styles';
export const Header = () => {
  const selectedPlace = useSelector(selectSelectedPlace);

  return (
    <HeaderWrapper>
      <HeaderLegend>
        <TextLarge color={theme.colors.primary}>Quick Weather</TextLarge>
        <TextSmall color={theme.colors.secondary}>&nbsp;&nbsp;&nbsp;by Taras Kukharets</TextSmall>
      </HeaderLegend>
      <ExpandMenu selectedPlaceTitle={selectedPlace?.structured_formatting?.main_text} />
    </HeaderWrapper>
  );
};
