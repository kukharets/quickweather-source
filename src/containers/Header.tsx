import React from 'react';
import { TextLarge, TextSmall } from '@root/App.styles';
import { theme } from '@root/App.styles';
import { HeaderMenu } from '@components/HeaderMenu';
import { useSelector } from 'react-redux';
import { selectSelectedPlace } from '@selectors/app';
import { HeaderLegend, HeaderWrapper } from './Header.styles';
export const Header = () => {
  const selectedPlace = useSelector(selectSelectedPlace);

  return (
    <HeaderWrapper>
      <HeaderLegend>
        <TextLarge color={theme.colors.primary}>Quick Weather</TextLarge>
        <TextSmall color={theme.colors.secondary}>&nbsp;&nbsp;&nbsp;by Taras Kukharets</TextSmall>
      </HeaderLegend>
      <HeaderMenu selectedPlaceTitle={selectedPlace?.structured_formatting?.main_text} />
    </HeaderWrapper>
  );
};
