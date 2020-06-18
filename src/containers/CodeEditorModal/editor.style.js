import styled from "styled-components";

export const Content = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  font-size: 17px;
`;
export const Text = styled.div`
  #url {
    color: #34bf2f !important;
  }
  margin-bottom: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 10px 0 10px 0;
  #save-changes {
    margin-right: 20px;
    background-color: #32c02f;
  }
  #cancel {
    background-color: #69767e;
  }

  .http-method {
    background-color: transparent;
    color: black;
    border: 1px solid black;
    min-height: 0px;
    margin-left: 10px;
    padding: 5px;
  }
  .active {
    background-color: #e3e3e3;
  }
`;
