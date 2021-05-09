import styled, { createGlobalStyle } from 'styled-components';
import Card from 'react-trello/dist/components/Card';
import LaneHeader from 'react-trello/dist/components/Lane/LaneHeader';

export const GlobalStyled = createGlobalStyle`
    .hidden-lane-header .react-trello-lane > header{
      display: none; 
    }
    .react-trello-lane > header {
        text-transform: uppercase !important;
        margin-bottom: 10px !important;
    }
    .react-trello-board {
      height: 50vh;
    }
    .card-urgent{
      border-left: 2px solid red
    }
    .card-high{
      border-left: 2px solid orange
    }
    .card-normal{
      border-left: 2px solid green
    }
    .card-low{
      border-left: 2px solid yellow
    }
`;

export const MyCard = styled(Card)`
  &:hover {
    background: white;
    border-bottom-color: #bdb4b4;
    box-shadow: 0px 0px 1px #333;
  }
`;

export const MyLaneHeader = styled(LaneHeader)`
  text-transform: uppercase !important;
  margin-bottom: 10px !important;
`;

export const HiddenLaneHeader = styled(LaneHeader)`
  color: red;
  display: none;
`;
