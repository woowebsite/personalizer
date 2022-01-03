import styled from 'styled-components';

const IconStyled = styled.span<{
  color: string;
}>`
  display: flex;
  line-height: 1;

  &.icon svg path {
    fill: ${(props) => props.color};
    transform: scale(${(props) => props.size / 24});
  }
`;

export default IconStyled;
