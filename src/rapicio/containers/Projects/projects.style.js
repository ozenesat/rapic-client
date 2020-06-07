import styled from 'styled-components';

const HeadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
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
    color: #fff;
    background-color: #35bf2e;
    :hover {
      opacity: 0.7;
    }
  }
`;

const Card = styled.button`
  background-color: #fff;
  padding: 20px;
  cursor: pointer;
  text-align: left;
  font-family: Somatic;
  min-width: 300px;
  border-width: 0;
  border-top-width: 8px;
  border-top-color: #35bf2e;
  border-top-style: solid;
  border-radius: 3px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  :hover {
    border-color: #ff7b00;
  }

  h2 {
    font-size: 22px;
  }
  h3 {
    font-size: 16px;
    font-weight: normal;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 150px;
  grid-gap: 20px;
  margin: 30px 0 30px 0;
`;

export { HeadingWrapper, Card, CardWrapper };
