import styled from 'styled-components';
import { compose } from 'ramda';
import { lighten, darken } from 'polished';


const getColor = ({ theme, type }) => theme.button[type];
const getDisplay = ({ block }) => block ? 'block' : 'inline-block';


const Button = styled.button`
  display: ${getDisplay}
  background-color: ${getColor};
  color: white;
  border: none;
  margin: 0;
  padding: 1em;
  text-decoration: none;

  &:focus {
    outline:0;
    background-color: ${compose(darken(0.1), getColor)};
  }

  &:active {
    background-color: ${compose(lighten(0.1), getColor)};
  }
`;


Button.defaultProps = {
  type: 'primary',
};

export default Button;
