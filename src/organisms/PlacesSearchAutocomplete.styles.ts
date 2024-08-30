/// <reference types="vite-plugin-svgr/client" />
import CrossIcon from '../assets/cross-circle.svg?react';

import styled from 'styled-components';
import { animations, TextBasic } from '../containers/App.styles';

export const PlacesSearchWrapper = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  & :last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;

export const CloseIcon = styled(CrossIcon)`
  &:hover {
    animation: ${animations.rotate} 0.1s forwards;
  }
  transition: transform 0.5s ease;
  cursor: pointer;
  height: 25px;
  width: 25px;
  border-radius: 2px;
  position: absolute;
  right: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
    padding: 0;
  }
`;

export const InputWrapper = styled.span`
  align-items: center;
  display: flex;
  position: relative;
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
    width: 100%;
  }
`;

export const PredictionItem = styled(TextBasic)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  padding: 0 10px;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryLight};
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  padding-left: 5px;
  padding-right: 30px;
  color: ${({ theme }) => theme.colors.white};
  width: 100%; /* Забезпечує, що input розтягується на всю ширину контейнера */
  box-sizing: border-box; /* Включає padding та border у загальну ширину */
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;
