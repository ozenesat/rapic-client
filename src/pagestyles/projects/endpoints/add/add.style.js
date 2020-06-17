import styled from "styled-components";

export const Container = styled.div`
  dispay: flex;
  flex: 1;
  margin: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 17px;
  button: active {
    opacity: 0.6;
  }

  .endpoint-name {
    margin-top: 10px;
    margin-bottom: 10px;
    input {
      font-family: DM Sans;
    }
  }

  .endpoint-description {
    height: 40%;
    margin-top: 10px;
    margin-bottom: 10px;

    textarea {
      font-family: DM Sans;
    }
  }

  .endpoint-url {
    margin-top: 10px;
    margin-bottom: 10px;
    input {
      font-family: DM Sans;
    }
  }

  #add-fields {
    width: fit-content;
    min-width: 30px;
    min-height: 30px;
    height: 30px;
    margin: 10px 0 10px 0;
    color: #000;
    background-color: #fff;
    border: 1px solid #a3aeaf;
    border-radius: 5px;
  }
`;
export const Field = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  min-width: 400px;

  button {
    min-width: 30px;
    min-height: 30px;
    height: 30px;
    margin-right: 20px;
  }

  input {
    height: 30px;
    font-size: 15px;
  }

  .field-type {
    background-color: #c7ced5;
    margin-right: 10px;
    height: 30px;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    min-width: 100px;
    text-align: center;
  }

  .field-name {
    margin-right: 10px;
  }

  .delete svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;
export const FieldsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  margin: 120px 0 0 0;
  #cancel {
    background-color: #6b757e;
  }
  #create {
    background-color: #34bf2f;
    margin-right: 20px;
  }
  ${(props) => props.customStyle}
`;
