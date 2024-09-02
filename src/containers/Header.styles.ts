import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  height: 55px;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vmin;
  background: linear-gradient(90deg, #ffffff 70%, rgba(47, 123, 167, 0.2) 85%, rgba(81, 127, 52, 0.2) 100%);
  box-shadow:
    0 2px 4px -1px rgb(0 0 0 / 20%),
    0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  margin-bottom: 20px;

    @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
        margin-bottom: 0;

    }
`;

export const HeaderLegend = styled.span`
  display: flex;
  align-items: baseline;
  @media (max-width: ${({ theme }) => theme.breakpoints.phone}) {
    flex-direction: column;
    span:nth-child(2) {
      padding-left: 70px;
      margin-top: -10px;
    }
  }
`;
