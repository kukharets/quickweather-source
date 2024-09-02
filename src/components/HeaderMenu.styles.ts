/// <reference types="vite-plugin-svgr/client" />
import styled from 'styled-components';
import GitHubIcon from '@assets/github.svg';
import LinkedInIcon from '@assets/in.png';
import UpWorkIcon from '@assets/upwork.svg';
import { TextBasic } from '@root/App.styles';

export const HeaderMenuButtons = styled.span`
  display: flex;
  justify-content: end;
  width: 80px;
  gap: 20px;
`;
export const HoverableButton = styled.span`
  height: 20px;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const ShareBlockWrapper = styled(TextBasic)`
  z-index: 9;
  position: fixed;
  top: 53px;
  right: 0;
  padding: 10px;
  background-color: rgb(245 245 245 / 86%);
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-top: none;
  border-right: none;
  border-bottom-left-radius: 20px;
`;

export const ShareIconsWrapper = styled.span`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const MenuIconsWrapper = styled(TextBasic)`
  z-index: 9;
  position: fixed;
  top: 53px;
  right: 0;
  background-color: rgb(245 245 245 / 86%);
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-top: none;
  border-right: none;
  border-bottom-left-radius: 20px;

  a {
    padding: 10px 5px 10px 15px;
    text-decoration: none;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;

    &:hover {
      span {
        text-decoration: underline;
      }
    }
  }
`;

export const socialIcons = {
  gitHub: GitHubIcon,
  upWork: UpWorkIcon,
  linkedIn: LinkedInIcon,
};

export const SocialIcon = styled.span<{ type: keyof typeof socialIcons }>`
  height: 30px;
  width: 30px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  display: block;
  ${({ type }) => `background-image: url(${socialIcons[type]})`}
`;