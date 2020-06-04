import styled from 'styled-components';

const HeadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  h1 {
    font-family: Imprima;
    font-size: 44px;
  }
  button {
    border-radius: 5px;
    max-height: 40px;
    @media screen and (max-width: 600px) {
      max-height: 60px;
    }
    color: #4a4a4a;
    background: linear-gradient(
      180deg,
      rgba(216, 216, 216, 1) 0%,
      rgba(179, 179, 179, 1) 100%
    );
    :hover {
      opacity: 0.7;
    }
  }
`;

const Card = styled.button`
  background-color: #d8d8d8;
  width: 23%;
  height: 150px;
  margin-bottom: 20px;
  @media screen and (max-width: 1200px) {
    width: 32%;
  }
  @media screen and (max-width: 991px) {
    width: 48%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }

  border-width: 0;
  border-top-width: 5px;
  border-color: #35bf2e;
  border-top-style: solid;
  cursor: pointer;
  :hover {
    border-color: #ff7b00;
  }
  h2 {
    font-size: 24px;
    font-family: Imprima;
  }
  h3 {
    font-size: 18px;
    font-family: Imprima;
    font-weight: normal;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  flex-flow: row wrap;
  width: 100%;
  height: auto;
`;

export { HeadingWrapper, Card, CardWrapper };
