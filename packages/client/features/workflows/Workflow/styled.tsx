import styled, { createGlobalStyle } from 'styled-components';
import Card from 'react-trello/dist/components/Card';
import LaneHeader from 'react-trello/dist/components/Lane/LaneHeader';

export const GlobalStyled = createGlobalStyle`
    .react-trello-lane > header {
        text-transform: uppercase !important;
        margin-bottom: 10px !important;
    }
    .react-trello-board {
      height: 50vh;
    }
    .card-urgent{
      background: red
    }
    .card-high{
      background: orange
    }
    .card-normal{
      background: green
    }
    .card-low{
      background: yellow
    }
`;

export const MyCard = styled(Card)`
  &:hover {
    background: white;
    border-bottom-color: #bdb4b4;
  }
`;

export const MyLaneHeader = styled(LaneHeader)`
  text-transform: uppercase !important;
  margin-bottom: 10px !important;
`;
