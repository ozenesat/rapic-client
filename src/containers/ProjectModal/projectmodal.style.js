import styled from "styled-components";

const Title = styled.span`
  font-family: DM Sans;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 17px;

  button: active {
    opacity: 0.6;
  }

  .project-name {
    margin-top: 10px;
    margin-bottom: 10px;
    input {
      font-family: DM Sans;
    }
  }

  .project-description {
    height: 40%;
    margin-top: 10px;
    margin-bottom: 10px;

    textarea {
      font-family: DM Sans;
    }
  }

  #create-project {
    margin-right: 20px;
    background-color: #32c02f;
  }
  #cancel {
    background-color: #69767e;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
  ${(props) => props.customStyle};
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "50%",
    marginTop: "500px;",
    maxHeight: "90%",
  },
};

export { Title, Content, Section, ButtonWrapper, ModalStyles };
