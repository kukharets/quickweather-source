import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import BackGroundIcon from '@assets/background.webp';

export const animations = {
  rotate: keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`,
};

export const theme = {
  colors: {
    primary: '#2F7BA7',
    secondary: '#517F34',
    white: '#f5f5f5',
    dark: '#33363b',
    primaryLight: 'rgba(47,123,167,0.53)',
    error: '#f13b3b',
    favorite: '#f1d1ad',
  },
  breakpoints: {
    phone: '500px',
    tablet: '800px',
    desktop: '1200px',
  },
};

export const GlobalStyle = createGlobalStyle`
    :root {
        overscroll-behavior: none;
    }
`;

export const TextBasic = styled.span`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${({ color }) => color || 'black'};
`;

export const TextSmall = styled(TextBasic)`
  font-size: 1rem;
`;

export const TextLarge = styled(TextBasic)`
  font-size: 2.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.8rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
    font-size: 1.4rem;
  }
`;

export const BackGroundSvg = styled.svg`
  display: block;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export const iconMixin = css`
  &:hover {
    animation: ${animations.rotate} 0.1s forwards;
  }
  cursor: pointer;
  height: 25px;
  width: 25px;
`;

export const ScrollableDiv = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
      width: 0;
    }
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

export const AppWrapper = styled.div`
  width: 100vw;
  background: url('${BackGroundIcon}') center center / cover no-repeat fixed;

  @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
    min-height: 200vh;
    max-height: 200vh;
    overflow: scroll;
  }
`;

export const MainPageLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  & > * {
    flex: 1;
  }
  overflow: hidden;
  padding: 0 20px;
  height: calc(100vh - 75px);
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
    display: block;
    position: fixed;
    height: 100%;
    width: 100%;
    padding: 0;
    & > * {
      flex: auto;
    }
  }
`;

export const BookmarkedPlacesWrapper = styled.div<{ $isFullVariant: boolean }>`
  position: relative;
  max-height: calc(100vh - 100px);
  gap: 15px;
  display: flex;
  margin-top: 85px;

  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
    margin-top: 100px;
    padding: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-grow: 1;
    min-height: 0;
  }
`;
export const SearchSectionWrapper = styled.div`
  margin-top: 55px;
`;

export const Legend = styled.div`
  width: 100%;
  height: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 15px;
  display: flex;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  border-radius: 100px 100px 0 0;
  position: absolute;
  top: -45px;
  @media (min-width: ${({ theme }) => theme.breakpoints.phone}) {
    display: none;
  }
  span {
    line-height: 20px;
  }
`;
