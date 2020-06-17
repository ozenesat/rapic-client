import styled from "styled-components";

export const Content = styled.div`
  position: relative;
  display: flex;
  flex: 0.75;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  margin: 5px 0 40px 40px;
  margin-top: 5px;
  border-radius: 10px;
  overflow: hidden;
  height: fit-content;
`;

export const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
  margin-top: 30px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.25;
  height: 100vh;
  overflow-x: hidden;
`;

export const MenuButton = styled.a`
  display: flex;
  height: 35px;
  align-items: center;
  color: black;
  cursor: pointer;
  border-bottom: 1px solid #dedfe0;
  padding-left: 5px;
  background-color: ${(props) => props.backgroundColor};
  :hover {
    background-color: #d6f3d6;
  }
`;

export const Title = styled.span`
  font-size: 22px;
  font-weight: bold;
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #dedfe0;
  .add-button {
    min-height: 30px;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 10px;
    background-color: transparent;
    color: black;
    border-radius: 5px;
    border: 1px solid #dedfe0;
  }
`;
