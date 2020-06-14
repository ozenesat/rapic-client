import styled from "styled-components";

export const Container = styled.div`
  dispay: flex;
  flex: 1;
  margin: 30px;

  #save {
    background-color: #32c02f;
  }
`;

export const DangerZoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  #delete {
    background-color: #be2e2f;
    width: fit-content;
    margin-top: 20px;
  }

  hr.solid {
    border-top: 3px solid #bbb;
  }
`;

export const Line = styled.div`
  border-top: 1px solid #d9dadb !important;
  margin: 20px 0 20px 0;
`;
