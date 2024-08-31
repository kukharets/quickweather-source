/// <reference types="vite-plugin-svgr/client" />

import styled from 'styled-components';
import { iconMixin, TextLarge, TextSmall } from '@containers/App.styles';
import CloseSvg from '@assets/close.svg?react';
import StarSvg from '@assets/star.svg?react';

export const CloseIcon = styled(CloseSvg)`
  ${iconMixin}
`;

export const FavoriteIcon = styled(StarSvg)<{ $bookmarked: boolean }>`
  ${iconMixin}
  & path {
    fill: ${({ $bookmarked, theme }) => ($bookmarked ? theme.colors.favorite : theme.colors.white)};
  }
`;

export const PlaceCardWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
`;

export const PlaceCardHeader = styled.div<{ $isFullVersion?: boolean }>`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  ${({ $isFullVersion }) =>
    !$isFullVersion &&
    `
    cursor: pointer;
    border-radius: 10px;
    gap: 20px;
    justify-content: space-between;
    padding-right: 30px;
    flex-direction: row;
    &:hover {
      background-color: rgba(0, 0, 0, 0.6); // 
    }
  `}
`;

export const HeaderShortWeather = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

export const PlaceTitle = styled(TextLarge)`
  color: ${({ theme }) => theme.colors.white};
`;

export const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 1px;
  width: 30%;
`;

export const PlaceDescription = styled(TextSmall)`
  color: ${({ theme }) => theme.colors.white};
`;

export const PlaceControls = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  gap: 10px;
  justify-content: end;
  flex-direction: row;
`;

export const PlaceCardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;
