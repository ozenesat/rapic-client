import styled from "styled-components";

export const Content = styled.div`
  position: relative;
  display: flex;
  flex: 0.75;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  margin: 5px 0 40px 40px;
  border-radius: 10px;
  overflow: hidden;
  height: fit-content;
  @media only screen and (max-width: 640px) {
    margin: 20px 0 40px 0px;
  }
`;

export const ProjectContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  @media only screen and (min-width: 640px) {
    display: flex;
  }
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
  min-width: 270px;
  overflow-x: hidden;
  .dropdown span {
    font-size: 22px;
    font-weight: bold;
    .icon {
      margin-left: 20px;
    }
  }
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
