import styled from 'styled-components';
import { themeGet } from 'styled-system';

const HGroup = styled.hgroup`
  margin-bottom: ${props => props.mb ?? '50px'};
  @media screen and (max-width: 480px) {
    margin-bottom: ${props => props.mb ?? '30px'};
  }
  text-align: ${props => props.textAlign ?? 'center'};
  h4 {
    color: ${themeGet('colors.slogan')};
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
    margin: 0;
  }
  h1 {
    color: ${themeGet('colors.textPrimary')};
    font-family: Imprima;
    font-weight: 300;
    font-size: 2.5em;
    line-height: 50px;
    padding: 0.1em;
    letter-spacing: -0.5px;
    margin: 0;
    @media screen and (max-width: 480px) {
      font-size: 20px;
      line-height: 30px;
    }
  }
`;

export default HGroup;
