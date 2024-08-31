/// <reference types="vite-plugin-svgr/client" />
import React, { useState } from 'react';
import MenuIcon from '@assets/menu.svg?react';
import ShareIcon from '@assets/share.svg?react';
import { TextSmall } from '@containers/App.styles';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';

import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { useOutsideClick } from '@hooks/useOutsideClick';
import {
  HeaderMenuButtons,
  HoverableButton,
  MenuIconsWrapper,
  ShareBlockWrapper,
  ShareIconsWrapper,
  SocialIcon,
} from './ExpandMenu.styles';
export const ExpandMenu = ({ selectedPlaceTitle = '' }) => {
  const [menuOpenState, setMenuOpenState] = useState(false);
  const [shareOpenState, setShareOpenState] = useState(false);

  const switchMenuOpenState = () => {
    setMenuOpenState(!menuOpenState);
    setShareOpenState(false);
  };

  const switchShareOpenState = () => {
    setMenuOpenState(false);
    setShareOpenState(!shareOpenState);
  };

  const handleCloseAllMenu = () => {
    setMenuOpenState(false);
    setShareOpenState(false);
  };

  const { ref: outsideClickRef } = useOutsideClick({ handler: handleCloseAllMenu });

  return (
    <HeaderMenuButtons ref={outsideClickRef}>
      {selectedPlaceTitle && (
        <HoverableButton onClick={switchShareOpenState}>
          <ShareIcon />
        </HoverableButton>
      )}
      <HoverableButton onClick={switchMenuOpenState}>
        <MenuIcon />
      </HoverableButton>
      {shareOpenState && (
        <ShareBlockWrapper>
          <div>
            Share weather in <b>{selectedPlaceTitle}</b>
          </div>
          <ShareIconsWrapper>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url={window.location.href}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <ViberShareButton url={window.location.href}>
              <ViberIcon size={32} round />
            </ViberShareButton>
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </ShareIconsWrapper>
        </ShareBlockWrapper>
      )}
      {menuOpenState && (
        <MenuIconsWrapper>
          <a href="https://github.com/kukharets/quickweather-source">
            <TextSmall>View source code</TextSmall> <SocialIcon type={'gitHub'} />
          </a>
          <a href="https://www.upwork.com/freelancers/~0169f6733a03d07859">
            <TextSmall>Visit author UpWork</TextSmall> <SocialIcon type={'upWork'} />
          </a>
          <a href="https://www.linkedin.com/in/taras-kukharets/">
            <TextSmall>Visit author LinkedIn</TextSmall> <SocialIcon type={'linkedIn'} />
          </a>
        </MenuIconsWrapper>
      )}
    </HeaderMenuButtons>
  );
};
