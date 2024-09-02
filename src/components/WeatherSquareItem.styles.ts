import styled from 'styled-components';
import SpinnerSvg from '@assets/spinner.svg?react';

export const Spinner = styled(SpinnerSvg)`
  position: absolute;
  top: 50%;
`;

export const PlaceCardWeatherSquare = styled.div<{ $isLoading: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
  background-color: rgba(0, 89, 255, 0.18);
  position: relative;
  ${({ $isLoading }) =>
    $isLoading &&
    `
        & > :nth-last-child(-n+2) {
            opacity: 0;
        }
    `}

  svg {
    width: 60px;
    height: 60px;
  }
`;
